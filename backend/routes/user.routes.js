// Import express to create a router instance
import express from "express";
// Import the controller functions that contain the actual business logic for these endpoints
import {
  login,
  register,
  updateProfile,
  logout,
} from "../controllers/user.controller.js";
// Import the authentication middleware to protect specific routes
import isAuthenticated from "../middleware/is.Authenticated.js";

// Create a new router instance
const router = express.Router();

// Map POST requests to "/register" to the register controller
router.route("/register").post(register);

// Map POST requests to "/login" to the login controller
router.route("/login").post(login);

// Map GET requests to "/logout" to the logout controller
router.route("/logout").get(logout);

// Map POST requests to "/profile/update".
// Notice 'isAuthenticated' is placed BEFORE 'updateProfile'.
// This means the server will verify the user's token FIRST. If valid, it proceeds to updateProfile.
router.route("/profile/update").post(isAuthenticated, updateProfile);

export default router;
