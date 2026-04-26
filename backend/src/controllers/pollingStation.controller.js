import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { PollingStation } from "../models/pollingStation.model.js";
import { Constituency } from "../models/constituency.model.js";
import { isValidObjectId } from "mongoose";

const createPollingStation = asyncHandler(async (req, res) => {
  const { constituencyId } = req.params;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Send Constituency Id in Right Format");
  }
  const constituency = await Constituency.findById(constituencyId);
  if (!constituency) {
    throw new ApiError(404, "Constituency not found");
  }
  const { name, address, longitude, latitude } = req.body;
  if (!name || name.trim() === "" || !address || address.trim() === "") {
    throw new ApiError(400, "All fields are required");
  }
  if (longitude === undefined || latitude === undefined) {
    throw new ApiError(400, "Longitude and latitude are required");
  }
  const existingPS = await PollingStation.findOne({
    $or: [
      { name, address },
      { longitude, latitude },
    ],
  });
  if (existingPS) {
    throw new ApiError(400, "This polling station already exists");
  }
  const newPS = await PollingStation.create({
    name,
    address,
    constituencyId,
    longitude,
    latitude,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, newPS, "New Polling Station Created"));
});

const getMyPollingStation = asyncHandler(async (req, res) => {
  const { constituencyId } = req.voter;
  if (!isValidObjectId(constituencyId)) {
    throw new ApiError(400, "The format of candidate Id is not correct");
  }
  const pollingStation = await PollingStation.findOne({
    constituencyId: constituencyId,
  }).populate("constituencyId", "name block district state ");
  if (!pollingStation) {
    throw new ApiError(404, "Polling Station not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pollingStation,
        "Polling Station Fetched Successfully",
      ),
    );
});

const getPollingStationsByConstituency = asyncHandler(async (req, res) => {
  const { constituencyId } = req.params;
  if (!isValidObjectId(constituencyId)) {
    throw new ApiError(400, "The constituency ID format is not correct");
  }
  const pollingStations = await PollingStation.find({ constituencyId });
  if (!pollingStations.length) {
    throw new ApiError(404, "No Polling Station Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pollingStations,
        "All Polling Stations Fetched Successfully",
      ),
    );
});

const deletePollingStation = asyncHandler(async (req, res) => {
  const { pollingStationId } = req.params;
  if (!isValidObjectId(pollingStationId)) {
    throw new ApiError(400, "Polling Station Id format wrong");
  }
  const deletedPS = await PollingStation.findByIdAndDelete(pollingStationId);
  if (!deletedPS) {
    throw new ApiError(400, "Polling Station Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedPS, "Polling Station Deleted Successfully"),
    );
});

const updatePollingStation = asyncHandler(async (req, res) => {
  const { pollingStationId } = req.params;
  if (!isValidObjectId(pollingStationId)) {
    throw new ApiError(400, "Polling Station Id is not correct");
  }
  const { name, address } = req.body;
  if (!name || name.trim() === "" || !address || address.trim() === "") {
    throw new ApiError(400, "Name and Address fields should be filled");
  }
  const updatedPS = await PollingStation.findByIdAndUpdate(
    pollingStationId,
    { $set: { name, address } },
    { new: true, runValidators: true },
  );
  if (!updatedPS) {
    throw new ApiError(400, "Polling Station Not Found ");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPS, "Polling Station Updated Successfully"),
    );
});

const getPollingStationById = asyncHandler(async (req, res) => {
  const { pollingStationId } = req.params;
  if (!isValidObjectId(pollingStationId)) {
    throw new ApiError(400, "Polling Station Id format wrong");
  }
  const pollingStation = await PollingStation.findById(
    pollingStationId,
  ).populate("constituencyId", "name block district state");
  if (!pollingStation) {
    throw new ApiError(404, "Polling Station Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pollingStation,
        "Polling Station Fetched Successfully",
      ),
    );
});

export {
  createPollingStation,
  getMyPollingStation,
  getPollingStationsByConstituency,
  deletePollingStation,
  updatePollingStation,
};
