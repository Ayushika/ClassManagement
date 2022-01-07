/** @format */

import express from "express";
import formidable from "express-formidable";
import { isInstructor, protect } from "../middleware/authMiddleware";
import {
  currentInstructor,
  courseCreate,
  courseGetAll,
  addLesson,
  uploadVideo,
  courseGetDetails,
} from "../controllers/InstructorController";
const router = express.Router();

router.route("/isvalid").post(protect, isInstructor, currentInstructor);
router.route("/course/create").post(protect, isInstructor, courseCreate);
router
  .route("/course/upload-video")
  .post(
    formidable({ maxFileSize: 700 * 1024 * 1024 }),
    protect,
    isInstructor,
    uploadVideo
  );
router.route("/course/add-lesson").post(protect, isInstructor, addLesson);
router.route("/course/get").post(protect, isInstructor, courseGetDetails);
router.route("/course/get/all").post(protect, isInstructor, courseGetAll);

export default router;
