/** @format */

import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware";
import { currentAdmin } from "../controllers/AdminController";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyEmail,
  logoutUser,
} from "../controllers/UserController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
forgotPassword;
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-email").post(verifyEmail);

router.route("/logout").post(logoutUser);

router.route("/admin/isValid").post(protect, isAdmin, currentAdmin);

export default router;
