import express from "express";
// Import the authentication middleware to protect specific routes
import isAuthenticated from "../middleware/is.Authenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

// Map POST requests to "/apply/:id" to create a job application.
router.route("/apply/:id").post(isAuthenticated, applyJob);

// Map GET requests to "/get" to fetch the user's applied jobs
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Map GET requests to "/:id/applicants" to fetch everyone who applied to a specific job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Map POST requests to "/status/:id/update" to allow an admin to change an application's status
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
