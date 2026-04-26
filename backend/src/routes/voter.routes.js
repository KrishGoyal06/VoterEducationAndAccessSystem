import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerVoter,
  loginVoter,
  logoutVoter,
  changePassword,
  refreshAccessToken,
  getCurrentVoter,
} from "../controllers/voter.controller.js";

const router = Router();

router.post("/register", registerVoter);
router.post("/login", loginVoter);
router.post("/logout", verifyJWT, logoutVoter);
router.post("/change-password", verifyJWT, changePassword);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", verifyJWT, getCurrentVoter);

export default router;
