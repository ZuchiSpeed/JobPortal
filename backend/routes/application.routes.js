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

// Map requests to "/apply/:id".
// FIX/SUGGESTION: In RESTful API design, actions that create or modify data (like applying for a job)
// should use POST requests, not GET. I highly recommend changing .get() to .post() here and in your
router.route("/apply/:id").get(isAuthenticated, applyJob);

// Map GET requests to "/get" to fetch the user's applied jobs
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Map GET requests to "/:id/applicants" to fetch everyone who applied to a specific job
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Map POST requests to "/status/:id/update" to allow an admin to change an application's status
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
