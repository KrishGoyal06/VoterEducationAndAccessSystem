import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
const options = { httpOnly: true, secure: true };
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const admin = await Admin.findById(userId);
    const accessAdminToken = admin.generateAccessAdminToken();
    const refreshAdminToken = admin.generateRefreshAdminToken();
    admin.refreshAdminToken = refreshAdminToken;
    await admin.save({ validateBeforeSave: false });
    return { accessAdminToken, refreshAdminToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "All the Fields should be filled");
  }
  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.isPasswordCorrect(password))) {
    throw new ApiError(400, "Invalid username or password");
  }
  const { accessAdminToken, refreshAdminToken } =
    await generateAccessTokenAndRefreshToken(admin._id);

  const loggedAdmin = await Admin.findById(admin._id).select(
    "-password -refreshAdminToken",
  );
  return res
    .status(200)
    .cookie("accessAdminToken", accessAdminToken, options)
    .cookie("refreshAdminToken", refreshAdminToken, options)
    .json(
      new ApiResponse(
        200,
        { admin: loggedAdmin, accessAdminToken, refreshAdminToken },
        "Admin Logged Successfully",
      ),
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    { $unset: { refreshAdminToken: 1 } },
    { new: true },
  );
  return res
    .status(200)
    .clearCookie("accessAdminToken", options)
    .clearCookie("refreshAdminToken", options)
    .json(new ApiResponse(200, {}, "Logged Out Successfull"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshAdminToken;
  if (!token) {
    throw new ApiError(404, "Token Not Found");
  }
  const decodedToken = jwt.verify(
    token,
    process.env.ADMIN_REFRESH_TOKEN_SECRET,
  );
  if (!decodedToken) {
    throw new ApiError(400, "Unauthorized User");
  }
  const admin = await Admin.findById(decodedToken._id);
  if (!admin) {
    throw new ApiError(404, "Admin Not Found");
  }
  if (token !== admin.refreshAdminToken) {
    throw new ApiError(400, "Refresh Token is expired or used");
  }
  const { accessAdminToken, refreshAdminToken: newAdminToken } =
    await generateAccessTokenAndRefreshToken(admin._id);

  return res
    .status(200)
    .cookie("accessAdminToken", accessAdminToken, options)
    .cookie("refreshAdminToken", newAdminToken, options)
    .json(
      new ApiResponse(
        200,
        { accessAdminToken, refreshAdminToken: newAdminToken },
        "The Admin LoggedIn Successfully",
      ),
    );
});
export { loginAdmin, logoutAdmin, refreshAccessToken };
