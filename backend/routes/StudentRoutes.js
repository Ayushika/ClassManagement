/** @format */

import express from "express";
import { isStudent, protect } from "../middleware/authMiddleware";
import { currentStudent, courseGet } from "../controllers/StudentController";
const router = express.Router();

router.route("/isvalid").post(protect, isStudent, currentStudent);
router.route("/course/get").post(protect, isStudent, courseGet);

export default router;
