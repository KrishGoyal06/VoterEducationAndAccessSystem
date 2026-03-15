import mongoose, { Schema } from "mongoose";

const constituencySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  block: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
    toLower: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    toLower: true,
  },
});

export const Constituency = mongoose.model("Constituency", constituencySchema);
