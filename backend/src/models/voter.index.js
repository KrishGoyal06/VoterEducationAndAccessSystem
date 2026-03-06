import mongoose, { Schema } from "mongoose";

const voterSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    uniqueID: {
      type: String,
      required: [true, "Voter ID is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Voter must be at least 18 years old"],
      max: [120, "Please enter a valid age"],
    },
    constituency: {
      type: String,
      required: [true, "Constituency is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
  },
  { timestamps: true },
);

export const Voter = mongoose.model("Voter", voterSchema); //this is stored as voters not Voter
