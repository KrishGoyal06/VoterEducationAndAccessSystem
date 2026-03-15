import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema({
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
  address: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    default: "Independent",
  },
  constituencyId: {
    type: Schema.Types.ObjectId,
    ref: "Constituency",
  },
});

export const Candidate = mongoose.model("Candidate", candidateSchema);
