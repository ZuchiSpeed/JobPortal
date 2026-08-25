import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";

// Initialize dotenv to load environment variables immediately
dotenv.config({});
// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON payloads from the request body
app.use(express.json());
// Middleware to parse URL-encoded data (typically sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Apply the cookie parser middleware so we can access cookies via req.cookies
app.use(cookieParser());

// Configure CORS options to control which frontends can access this backend
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Apply the configured CORS middleware to all routes
app.use(cors(corsOptions));

// Mount the user routes. Any request starting with "/api/v1/user" will be handled by userRoutes
app.use("/api/v1/user", userRoutes);

// Start the server and listen for incoming network requests
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to the MongoDB database
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
