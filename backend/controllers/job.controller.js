// Import the Job model to interact with the jobs collection in the database
import { Job } from "../models/job.model.js";

/**
 * @desc    Create a new job post
 * @route   POST /api/v1/job/post
 */
export const jobPost = async (req, res) => {
  try {
    // Destructure all required job details from the incoming request body
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    // Extract the logged-in user's ID (injected into the request by the authentication middleware)
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    // Create and save the new job document in the database
    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId, // Links the job post to the user who created it
    });

    // Return a 201 Created status along with the newly created job data
    return res.status(201).json({
      message: "Job Post Created Successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

/**
 * @desc    Get all jobs (with optional keyword search)
 * @route   GET /api/v1/job/get
 */
export const getAllJobs = async (req, res) => {
  try {
    // Extract the search keyword from the URL query parameters (e.g., ?keyword=react)
    // If no keyword is provided, default to an empty string
    const keyword = req.query.keyword || "";

    // Construct a MongoDB query object to search for the keyword in either the title or description
    const query = {
      $or: [
        // $regex performs a pattern match, $options: "i" makes it case-insensitive
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    // Execute the query, populate the referenced 'company' data so we get company details,
    // and sort the results by 'createdAt' in descending order (-1 means newest first)
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

/**
 * @desc    Get a single job by its ID
 * @route   GET /api/v1/job/get/:id
 */
export const getJobById = async (req, res) => {
  try {
    // Extract the job ID from the URL route parameters (e.g., /get/64f1a2b3...)
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

/**
 * @desc    Get all jobs created by the logged-in admin/recruiter
 * @route   GET /api/v1/job/getadminjobs
 */
export const getAdminJobs = async (req, res) => {
  try {
    // Get the logged-in admin's ID from the request object
    const adminId = req.id;

    // Query the database for all jobs where the 'created_by' field matches the admin's ID
    const jobs = await Job.find({ created_by: adminId });

    // Check if the returned array is empty
    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
