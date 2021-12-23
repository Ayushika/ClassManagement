/** @format */

import express from "express";
import { isStudent, protect } from "../middleware/authMiddleware";
import { currentStudent } from "../controllers/StudentController";
const router = express.Router();

router.route("/isValid").post(protect, isStudent, currentStudent);

export default router;
