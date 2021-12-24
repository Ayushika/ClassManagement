/** @format */

import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware";
import { currentAdmin } from "../controllers/AdminController";
import {
  createInstitute,
  getAllInstitute,
  deleleInstitute,
} from "../controllers/InstituteController.js";
const router = express.Router();

router.route("/isValid").post(protect, isAdmin, currentAdmin);
router.route("/institute/all").post(protect, isAdmin, getAllInstitute);
router.route("/institute/:slug").delete(protect, isAdmin, deleleInstitute);
router.route("/institute").post(protect, isAdmin, createInstitute);

export default router;
