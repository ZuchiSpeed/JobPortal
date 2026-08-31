import { Company } from "../models/company.model.js";

/**
 * @desc    Register a new company
 * @route   POST /api/v1/company/register
 */
export const registerCompany = async (req, res) => {
  try {
    // Extract the company name from the incoming request body
    const { companyName } = req.body;

    // Validate that the company name is actually provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // Query the database to see if a company with this exact name already exists
    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create and save the new company document in the database.
    // 'req.id' is injected by your authentication middleware so we know WHO registered i
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    // Return a 201 Created status along with the newly created company data
    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);

    // Send a 500 response so the client knows the request failed (prevents infinite loading)
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

/**
 * @desc    Get all companies registered by the logged-in user
 * @route   GET /api/v1/company/get
 */
export const getCompany = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request object
    const userId = req.id; //logged in user

    // Query the database for all companies where the 'userId' matches the logged-in user
    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Get a single company by its ID
 * @route   GET /api/v1/company/get/:id
 */
export const getCompanyById = async (req, res) => {
  try {
    // Extract the company ID from the URL parameters
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    // If no company matches the provided ID, return a 404 Not Found error
    if (!company) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    // Return the found company document with a 200 OK status
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Update company information
 * @route   PUT /api/v1/company/update/:id
 */
export const updateCompany = async (req, res) => {
  try {
    // Extract the fields that can be updated from the request body
    const { name, description, website, location } = req.body;

     // Access the uploaded file (e.g., a company logo) if a file upload middleware like Mul
    const file = req.file;

    // Package the extracted fields into an object to be passed to the database
    const updatedData = { name, description, website, location };

    // Find the company by its ID and update its fields with 'updatedData'
    // The { new: true } option ensures Mongoose returns the *updated* document, rather than the old
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true },
    );

    // If no company matches the ID provided in the URL, return a 404 error
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Information updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
