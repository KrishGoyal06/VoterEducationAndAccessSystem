import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Voter } from "../models/voter.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const voter = await Voter.findById(decodedToken?._id).select(
      "-password -refreshToken",
    );

    if (!voter) {
      throw new ApiError(400, "Invalid Authorization Token");
    }

    req.voter = voter;
    next();
  } catch (error) {
    throw new ApiError(
      400,
      error?.message || "Invalid Token is passed in middleware",
    );
  }
});
