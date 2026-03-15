import mongoose, { Schema } from "mongoose";

const voterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    constituencyId: {
      type: Schema.Types.ObjectId,
      ref: "Constituency",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Voter = mongoose.model("Voter", voterSchema);
