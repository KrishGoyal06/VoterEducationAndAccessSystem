import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Voter } from "../models/voter.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Constituency } from "../models/constituency.model.js";

const options = { httpOnly: true, secure: true };

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const voter = await Voter.findById(userId);
    const refreshToken = voter.generateRefreshToken();
    const accessToken = voter.generateAccessToken();
    voter.refreshToken = refreshToken;
    await voter.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the Refresh and Access Token",
    );
  }
};

const registerVoter = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    dob,
    phone,
    block,
    district,
    state,
  } = req.body;
  if (
    [name, username, email, password, dob, phone, block, district, state].some(
      (field) => field === undefined || String(field).trim() === "",
    )
  ) {
    throw new ApiError(400, "All the Fields should be filled");
  }
  const constituency = await Constituency.findOne({
    district: district.toLowerCase(),
    block: block.toLowerCase(),
    state: state.toLowerCase(),
  });
  if (!constituency) {
    throw new ApiError(
      404,
      "The district you entered has no constituency mentioned",
    );
  }
  const existUser = await Voter.findOne({
    $or: [{ email }, { phone }, { username }],
  });

  if (existUser) {
    throw new ApiError(400, "These details for the user already exist");
  }
  const voter = await Voter.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
    dob,
    phone,
    constituencyId: constituency._id,
  });
  const createdVoter = await Voter.findById(voter._id).select(
    "-password -refreshToken",
  );
  if (!createdVoter) {
    throw new ApiError(500, "User is not Created");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdVoter, "Voter Created Successfully"));
});

const loginVoter = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!(username || email) || !password) {
    throw new ApiError(400, "All the Fields should be filled");
  }
  const voter = await Voter.findOne({
    $or: [{ email }, { username }],
  });
  if (!voter) {
    throw new ApiError(404, "User doesnot Exist");
  }
  const isPasswordValid = await voter.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Password is not Correct");
  }
  const { refreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(voter._id);

  const loggedUser = await Voter.findById(voter._id).select(
    "-password -refreshToken",
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { voter: loggedUser, accessToken, refreshToken },
        "The User LoggedIn Successfully",
      ),
    );
});

const logoutVoter = asyncHandler(async (req, res) => {
  await Voter.findByIdAndUpdate(
    req.voter._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Voter LoggedOut Successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Send old and new Password first");
  }
  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password cannot be same as old password");
  }
  const voter = await Voter.findById(req.voter._id);
  const isPasswordValid = await voter.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "Password is Not Correct");
  }
  voter.password = newPassword;
  await voter.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inComingRefrestToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!inComingRefrestToken) {
    throw new ApiError(400, "Unauthorized User");
  }
  const decodedToken = jwt.verify(
    inComingRefrestToken,
    process.env.REFRESH_TOKEN_SECRET,
  );
  if (!decodedToken) {
    throw new ApiError(400, "Unauthorized User");
  }
  const voter = await Voter.findById(decodedToken._id);
  if (!voter) {
    throw new ApiError(400, "Invalid Refresh Token");
  }
  if (inComingRefrestToken !== voter?.refreshToken) {
    throw new ApiError(400, "Refresh Token is expired or used");
  }
  const { refreshToken: newRefreshToken, accessToken } =
    await generateAccessTokenAndRefreshToken(voter._id);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "The User LoggedIn Successfully",
      ),
    );
});

const getCurrentVoter = asyncHandler(async (req, res) => {
  const voter = await Voter.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.voter._id),
      },
    },
    {
      $lookup: {
        from: "constituencies",
        localField: "constituencyId",
        foreignField: "_id",
        as: "address",
      },
    },
    {
      $unwind: "$address",
    },
    {
      $project: {
        name: 1,
        username: 1,
        email: 1,
        dob: 1,
        phone: 1,
        "address.block": 1,
        "address.district": 1,
        "address.state": 1,
      },
    },
  ]);
  if (!voter.length) {
    throw new ApiError(400, "Voter Doesn't exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, voter[0], "Voter Data Fetched Successfully"));
});

export {
  registerVoter,
  loginVoter,
  logoutVoter,
  changePassword,
  refreshAccessToken,
  getCurrentVoter,
};
