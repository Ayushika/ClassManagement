/** @format */

import express from "express";
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
forgotPassword
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-email").post(verifyEmail);

router.route("/logout").post(logoutUser);

export default router;
