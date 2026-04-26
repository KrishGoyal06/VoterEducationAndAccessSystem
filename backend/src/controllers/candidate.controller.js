import { isValidObjectId } from "mongoose";
import { Candidate } from "../models/candidate.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Constituency } from "../models/constituency.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCandidate = asyncHandler(async (req, res) => {
  const { name, email, address, party, constituencyId } = req.body;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Send Constituency Id in Right Format");
  }
  if (
    [name, email, address, party].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "Details are not filled correctly");
  }

  const constituency = await Constituency.findById(constituencyId);
  if (!constituency) {
    throw new ApiError(404, "Constituency Not Found");
  }
  const existingCandidate = await Candidate.findOne({ email, constituencyId });
  if (existingCandidate) {
    throw new ApiError(
      400,
      "Candidate with this email already exists in the constituency!!",
    );
  }

  const candidate = await Candidate.create({
    name,
    email,
    address,
    party,
    constituencyId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, candidate, "New Candidate Created"));
});

const updateCandidate = asyncHandler(async (req, res) => {
  const { candidateId } = req.params;
  if (!candidateId || !isValidObjectId(candidateId)) {
    throw new ApiError(400, "Send Candidate Id in Right Format");
  }
  const { name, email, address, party } = req.body;
  if (!name && !email && !address && !party) {
    throw new ApiError(400, "Send at least one field to update");
  }
  const updatedData = {};
  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (address) updatedData.address = address;
  if (party) updatedData.party = party;
  const updatedCandidate = await Candidate.findByIdAndUpdate(
    candidateId,
    { $set: updatedData },
    { new: true },
  );
  if (!updatedCandidate) {
    throw new ApiError(404, "Candidate Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCandidate, "Candidate Updated Successfully"),
    );
});

const deleteCandidate = asyncHandler(async (req, res) => {
  const { candidateId } = req.params;
  if (!candidateId || !isValidObjectId(candidateId)) {
    throw new ApiError(400, "Send Candidate Id in Right Format");
  }
  const candidate = await Candidate.findByIdAndDelete(candidateId);
  if (!candidate) {
    throw new ApiError(404, "Candidate Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Candidate Deleted Successfully"));
});

const getCandidatesByConstituency = asyncHandler(async (req, res) => {
  const { constituencyId } = req.params;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Send Constituency Id in Right Format");
  }
  const candidates = await Candidate.find({ constituencyId }).populate(
    "constituencyId",
    "name block district state",
  );
  if (candidates.length === 0) {
    throw new ApiError(404, "No Candidates Found for this Constituency");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, candidates, "Candidates Fetched Successfully"));
});

const getMyConstituencyCandidates = asyncHandler(async (req, res) => {
  const { constituencyId } = req.voter;
  if (!constituencyId || !isValidObjectId(constituencyId)) {
    throw new ApiError(400, "Invalid Constituency Id in Voter Profile");
  }
  const candidates = await Candidate.find({ constituencyId }).populate(
    "constituencyId",
    "name block district state",
  );
  if (candidates.length === 0) {
    throw new ApiError(404, "No Candidates Found for your Constituency");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, candidates, "Candidates Fetched Successfully"));
});

const getCandidateById = asyncHandler(async (req, res) => {
  const { candidateId } = req.params;
  if (!candidateId || !isValidObjectId(candidateId)) {
    throw new ApiError(400, "Send Candidate Id in Right Format");
  }
  const candidate = await Candidate.findById(candidateId).populate(
    "constituencyId",
    "name block district state",
  );
  if (!candidate) {
    throw new ApiError(404, "Candidate Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, candidate, "Candidate Fetched Successfully"));
});

export {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateById,
  getCandidatesByConstituency,
  getMyConstituencyCandidates,
};
