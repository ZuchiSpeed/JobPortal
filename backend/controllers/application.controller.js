import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

/**
 * @desc    Submit a new job application
 * @route   POST /api/v1/application/apply/:id
 */
export const applyJob = async (req, res) => {
  try {
    // Extract the logged-in user's ID (injected by the auth middleware) and the Job ID from the UR
    const userId = req.id;
    const jobId = req.params.id;

    // Basic validation to ensure a job ID was actually provided in the URL
    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    // Check the database to see if this specific user has already applied for this specific job
    const existingApplication = await Application.findOne({
      job: jobId,
      application: userId,
    });

    // Prevent users from spamming applications for the same job
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Fetch the job details from the database to ensure the job actually exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create and save the new application document in the database
    const newApplication = await Application.create({
      job: jobId, // Link the application to the specific job
      application: userId, //Link the application to the specific user
    });

    // Push the new application's ID into the Job's 'application' array (if your Job model tracks applicants this way)
    // and save the updated Job document
    job.application.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Application submitted successfully",
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
 * @desc    Get all jobs the logged-in user has applied for
 * @route   GET /api/v1/application/get
 */
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    // Find all applications for this user.
    const application = await Application.find({ application: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    // Because .find() returns an array, we check its length to see if the user has any applications
    if (application.length === 0) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }

    return res.status(200).json({
      application,
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
 * @desc    Get all applicants for a specific job (Admin/Recruiter view)
 * @route   GET /api/v1/application/:id/applicants
 */
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the specific job and populate its 'application' array (the list of people who applied).
    // We then nest-populate 'application' again to fetch the actual User details (name, email, resume)
    // associated with each application document.
    const job = await Job.findById(jobId).populate({
      path: "application", // Fetch the Application documents attached to this Job
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "application", // Inside the Application model, fetch the User reference
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Return the job object, which now contains all the applicant details nested inside it
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
 * @desc    Update the status of an application (e.g., 'accepted' or 'rejected')
 * @route   POST /api/v1/application/status/:id/update
 */
export const updateStatus = async (req, res) => {
  try {
    // Extract the new status from the request body and the application ID from the URL params
    const { status } = req.body;
    const applicationId = req.params.id;

    // Validate that a status was actually provided
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // Find the specific application document in the database
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // Update the status. We use .toLowerCase() to ensure consistency in the database
    application.status = status.toLowerCase();

    // Save the updated document back to the database
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
