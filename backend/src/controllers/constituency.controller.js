import { isValidObjectId } from "mongoose";
import { Constituency } from "../models/constituency.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createConstituency = asyncHandler(async (req, res) => {
  const { name, block, district, state } = req.body;
  if (
    [name, block, district, state].some(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "Details are not filled correctly");
  }
  const constituency = await Constituency.findOne({
    name: name.toLowerCase(),
    block: block.toLowerCase(),
    district: district.toLowerCase(),
    state: state.toLowerCase(),
  });
  if (constituency) {
    throw new ApiError(400, "Constituency already exists!!");
  }
  const newConstituency = await Constituency.create({
    name: name.toLowerCase(),
    block: block.toLowerCase(),
    district: district.toLowerCase(),
    state: state.toLowerCase(),
  });
  return res
    .status(201)
    .json(new ApiResponse(201, newConstituency, "New Constituency Created"));
});

const getConstituencyById = asyncHandler(async (req, res) => {
  const { constituencyId } = req.params;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Send Constituency Id in Right Format");
  }
  const constituency = await Constituency.findById(constituencyId);
  if (!constituency) {
    throw new ApiError(404, "Constituency Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, constituency, "Constituency Fetched Successfully"),
    );
});

const updateConstituency = asyncHandler(async (req, res) => {
  const { constituencyId } = req.params;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Send Constituency Id in Right Format");
  }
  const { name, block, district, state } = req.body;
  if (!name && !block && !district && !state) {
    throw new ApiError(400, "Send at least one field to update");
  }
  const updatedData = {};
  if (name) updatedData.name = name.toLowerCase();
  if (block) updatedData.block = block.toLowerCase();
  if (district) updatedData.district = district.toLowerCase();
  if (state) updatedData.state = state.toLowerCase();
  const updatedConstituency = await Constituency.findByIdAndUpdate(
    constituencyId,
    { $set: updatedData },
    { new: true },
  );
  if (!updatedConstituency) {
    throw new ApiError(404, "Constituency Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedConstituency,
        "Constituency has been updated ",
      ),
    );
});

const getAllConstituency = asyncHandler(async (req, res) => {
  const constituencies = await Constituency.find();
  if (!constituencies.length) {
    throw new ApiError(404, "No constituencies found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, constituencies, "All constituencies fetched"));
});

const deleteConstituency = asyncHandler(async (req, res) => {
  const { constituencyId } = req.params;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Send Constituency Id in Right Format");
  }
  const constituency = await Constituency.findByIdAndDelete(constituencyId);
  if (!constituency) {
    throw new ApiError(404, "Constituency Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Constituency Deleted Successfully"));
});

export {
  createConstituency,
  getAllConstituency,
  getConstituencyById,
  updateConstituency,
  deleteConstituency,
};
