/** @format */

import express from "express";
import { isInstructor, protect } from "../middleware/authMiddleware";
import { currentInstructor } from "../controllers/InstructorController";
const router = express.Router();

router.route("/isValid").post(protect, isInstructor, currentInstructor);

export default router;