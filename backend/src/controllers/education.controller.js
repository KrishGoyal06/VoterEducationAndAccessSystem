import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { EducationMaterial } from "../models/educationMaterial.model.js";

const createEducation = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === "") {
    throw new ApiError(400, "Education title is required");
  }
  if (!description || description.trim() === "") {
    throw new ApiError(400, "Education description is required");
  }
  const educationMaterial = await EducationMaterial.findOne({ title });
  if (educationMaterial) {
    throw new ApiError(400, "Education Material already exists!!");
  }
  const newEducationMaterial = await EducationMaterial.create({
    title,
    description,
    publisher: req.admin._id,
  });
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newEducationMaterial,
        "New Education Material Created",
      ),
    );
});

const getEducationById = asyncHandler(async (req, res) => {
  const { educationId } = req.params;
  if (!educationId || !isValidObjectId(educationId)) {
    throw new ApiError(400, "Send Education Id in Right Format");
  }
  const educationMaterial = await EducationMaterial.findById(educationId);
  if (!educationMaterial) {
    throw new ApiError(404, "Education Material Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        educationMaterial,
        "Education Material Fetched Successfully",
      ),
    );
});

const updateEducation = asyncHandler(async (req, res) => {
  const { educationId } = req.params;
  if (!educationId || !isValidObjectId(educationId)) {
    throw new ApiError(400, "Send Education Id in Right Format");
  }
  const { title, description } = req.body;
  if (!title && !description) {
    throw new ApiError(400, "Send at least one field to update");
  }
  const updatedData = {};
  if (title) updatedData.title = title;
  if (description) updatedData.description = description;
  const updatedEducationMaterial = await EducationMaterial.findByIdAndUpdate(
    educationId,
    { $set: updatedData },
    { new: true },
  );
  if (!updatedEducationMaterial) {
    throw new ApiError(404, "Education Material Not Found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedEducationMaterial,
        "Education Material has been updated ",
      ),
    );
});

const deleteEducation = asyncHandler(async (req, res) => {
  const { educationId } = req.params;
  if (!educationId || !isValidObjectId(educationId)) {
    throw new ApiError(400, "Send Education Id in Right Format");
  }
  const educationMaterial =
    await EducationMaterial.findByIdAndDelete(educationId);
  if (!educationMaterial) {
    throw new ApiError(404, "Education Material Not Found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Education Material Deleted Successfully"));
});

const getAllEducation = asyncHandler(async (req, res) => {
  const educationMaterials = await EducationMaterial.find();
  if (!educationMaterials.length) {
    throw new ApiError(404, "No Education Materials found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        educationMaterials,
        "All Education Materials fetched",
      ),
    );
});

export {
  createEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
  getAllEducation,
};
