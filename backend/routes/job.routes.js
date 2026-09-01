// Import the express framework to create a router instance
import express from "express";
// Import the authentication middleware to protect specific routes
import isAuthenticated from "../middleware/is.Authenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  jobPost,
} from "../controllers/job.controller.js";

// Create a new router instance to group job-related routes
const router = express.Router();

// Map POST requests to "/post".
// 'isAuthenticated' runs first to verify the user's token. If valid, it passes control to 'jobPost'.
router.route("/post").post(isAuthenticated, jobPost);

// Map GET requests to "/get" to fetch all jobs (requires authentication)
router.route("/get").get(isAuthenticated, getAllJobs);

// Map GET requests to "/get/:id" to fetch a specific job by its ID (requires authentication)

router.route("/get/:id").get(isAuthenticated, getJobById);

// Map GET requests to "/getadminjobs" to fetch jobs created by the logged-in user (requires authentication)

router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router;
