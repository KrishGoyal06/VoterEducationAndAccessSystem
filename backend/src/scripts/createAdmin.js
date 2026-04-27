import mongoose from "mongoose";
import { Admin } from "../models/admin.model.js";
import dotenv from "dotenv";

dotenv.config();

export const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const existingAdmin = await Admin.findOne({
      username: process.env.ADMIN_USERNAME,
    });
    if (existingAdmin) {
      console.log("Admin user already exists. No new admin created.");
      return;
    }
    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
