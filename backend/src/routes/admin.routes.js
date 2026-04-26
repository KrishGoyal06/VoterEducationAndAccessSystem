import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
import {
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
} from "../controllers/admin.controller.js";

const router = Router();

router.post("/login", loginAdmin);
router.post("/logout", verifyAdminJWT, logoutAdmin);
router.post("/refresh-token", refreshAccessToken);

export default router;
