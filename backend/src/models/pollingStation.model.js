import mongoose, { Schema } from "mongoose";

const pollingStationSchema = new Schema({
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
