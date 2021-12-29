/** @format */

import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyEmail,
  logoutUser,
  currentUser,
  userDetails,
  userUpdate,
} from "../controllers/UserController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-email").post(verifyEmail);
router.route("/isvalid").post(protect, currentUser);
router.route("/logout").post(logoutUser);
router.route("/update-profile").put(protect, userUpdate);
router.route("/:id").post(protect, userDetails);

export default router;
