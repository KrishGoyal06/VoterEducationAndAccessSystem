import mongoose, { Schema } from "mongoose";

const pollingStationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  constituencyId: {
    type: Schema.Types.ObjectId,
    ref: "Constituency",
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

export const PollingStation = mongoose.model(
  "PollingStation",
  pollingStationSchema,
);
