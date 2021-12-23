import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  verifyEmail,
} from "../controllers/UserController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-email").post(verifyEmail);

export default router;
