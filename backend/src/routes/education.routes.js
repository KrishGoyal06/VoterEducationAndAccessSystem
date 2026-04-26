import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
  getAllEducation,
} from "../controllers/education.controller.js";

const router = Router();

router.post("/create", verifyAdminJWT, createEducation);
router.get("/education/:educationId", verifyJWT, getEducationById);
router.patch("/update-education/:educationId", verifyAdminJWT, updateEducation);
router.delete(
  "/delete-education/:educationId",
  verifyAdminJWT,
  deleteEducation,
);
router.get("/all-education", verifyJWT, getAllEducation);

export default router;
