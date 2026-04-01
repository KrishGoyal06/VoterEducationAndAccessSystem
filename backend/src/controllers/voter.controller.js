import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Voter } from "../models/voter.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Constituency } from "../models/constituency.model.js";

const registerVoter = asyncHandler(async (req, res) => {
  const { name, email, password, dob, phone, block, district, state } =
    req.body;
  if (
    [name, email, password, dob, phone, block, district, state].some(
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
    $or: [{ email }, { phone }],
  });

  if (existUser) {
    throw new ApiError(400, "These details for the user already exist");
  }
  const voter = await Voter.create({
    name,
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
    .status(200)
    .json(new ApiResponse(200, createdVoter, "Voter Created Successfully"));
});

export { registerVoter };
