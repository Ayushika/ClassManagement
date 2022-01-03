/** @format */

import express from "express";
import { isInstructor, protect } from "../middleware/authMiddleware";
import {
  currentInstructor,
  courseCreate,
  courseGet,
} from "../controllers/InstructorController";
const router = express.Router();

router.route("/isvalid").post(protect, isInstructor, currentInstructor);
router.route("/course/create").post(protect, isInstructor, courseCreate);
router.route("/course/get").post(protect, isInstructor, courseGet);

export default router;
