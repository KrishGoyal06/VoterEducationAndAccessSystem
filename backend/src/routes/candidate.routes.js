import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateById,
  getCandidatesByConstituency,
  getMyConstituencyCandidates,
} from "../controllers/candidate.controller.js";

const router = Router();

router.post("/create", verifyAdminJWT, createCandidate);
router.patch("/update-candidate/:candidateId", verifyAdminJWT, updateCandidate);
router.delete(
  "/delete-candidate/:candidateId",
  verifyAdminJWT,
  deleteCandidate,
);
router.get("/my-constituency", verifyJWT, getMyConstituencyCandidates);
router.get("/constituency/:constituencyId", getCandidatesByConstituency);
router.get("/:candidateId", getCandidateById);

export default router;
