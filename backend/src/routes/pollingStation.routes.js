import { Router } from "express";
import {
  createPollingStation,
  getMyPollingStation,
  getPollingStationsByConstituency,
  deletePollingStation,
  updatePollingStation,
  getPollingStationById,
} from "../controllers/pollingStation.controller.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create/:constituencyId", verifyAdminJWT, createPollingStation);
router.get("/my-station", verifyJWT, getMyPollingStation);
router.get("/constituency/:constituencyId", getPollingStationsByConstituency);
router.get("/:pollingStationId", getPollingStationById);
router.patch("/:pollingStationId", verifyAdminJWT, updatePollingStation);
router.delete("/:pollingStationId", verifyAdminJWT, deletePollingStation);

export default router;
