import { Router } from "express";
import {
  createConstituency,
  getAllConstituency,
  getConstituencyById,
  updateConstituency,
  deleteConstituency,
} from "../controllers/constituency.controller.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.post("/create", verifyAdminJWT, createConstituency);
router.get("/all-constituency", getAllConstituency);
router.get("/constituency/:constituencyId", getConstituencyById);
router.patch(
  "/update-constituency/:constituencyId",
  verifyAdminJWT,
  updateConstituency,
);
router.delete(
  "/delete-constituency/:constituencyId",
  verifyAdminJWT,
  deleteConstituency,
);

export default router;
