/** @format */

import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware";
import { currentAdmin } from "../controllers/AdminController";
const router = express.Router();

router.route("/isValid").post(protect, isAdmin, currentAdmin);

export default router;
