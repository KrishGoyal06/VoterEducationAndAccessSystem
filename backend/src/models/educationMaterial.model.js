import mongoose, { Schema } from "mongoose";

const educationMaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true },
);

export const EducationMaterial = mongoose.model(
  "EducationMaterial",
  educationMaterialSchema,
);
