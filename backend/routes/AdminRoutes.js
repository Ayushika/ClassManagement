/** @format */

import express from "express";
import { isAdmin, protect } from "../middleware/authMiddleware";
import { currentAdmin } from "../controllers/AdminController";
import {
  createInstitute,
  getAllInstitute,
  deleteInstitute,
} from "../controllers/InstituteController.js";
import {
  createBranch,
  getAllBranch,
  deleteBranch,
} from "../controllers/BranchController.js";
const router = express.Router();


router.route("/isvalid").post(protect, isAdmin, currentAdmin);

/* INSTITUTE ROUTES */
router.route("/institute/all").post(protect, isAdmin, getAllInstitute);
router.route("/institute/:slug").delete(protect, isAdmin, deleteInstitute);
router.route("/institute").post(protect, isAdmin, createInstitute);

/* BRANCH ROUTES */
router.route("/branch/all").post(protect, isAdmin, getAllBranch);
router.route("/branch/:slug").delete(protect, isAdmin, deleteBranch);
router.route("/branch").post(protect, isAdmin, createBranch);

export default router;
