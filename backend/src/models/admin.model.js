import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshAdminToken: {
      type: String,
    },
  },
  { timestamps: true },
);

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessAdminToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRY,
    },
  );
};

adminSchema.methods.generateRefreshAdminToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ADMIN_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const Admin = mongoose.model("Admin", adminSchema);
