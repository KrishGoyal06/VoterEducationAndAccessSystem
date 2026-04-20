import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";

export const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessAdminToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ADMIN_ACCESS_TOKEN_SECRET,
    );
    const admin = await Admin.findById(decodedToken?._id).select(
      "-password -refreshAdminToken",
    );
    if (!admin) {
      throw new ApiError(400, "Invalid Authorization Token");
    }
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(
      400,
      error?.message || "Invalid Token is passed in middleware",
    );
  }
});
