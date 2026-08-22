import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * @desc    Register a new user
 * @route   POST /api/user/register
 */
export const register = async (req, res) => {
  try {
    // Destructure the required fields from the incoming request body
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Validate that no required fields are missing
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check the database to see if a user with the provided email already exists
    const user = await User.findOne({ email });

    // Prevent duplicate account creation
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Hash the plain-text password using bcrypt (10 is the salt rounds for security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user document in the database
    await User.create({
      fullname,
      email,
      password: hashedPassword, // Store the hashed version, never the plain text
      phoneNumber,
      role,
    });

    // Return a 201 Created success response
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/user/login
 */
export const login = async (req, res) => {
  try {
    // Destructure credentials from the request body
    const { email, password, role } = req.body;

    // Validate presence of all fields
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Fetch the user from the database by their email
    const user = await User.findOne({ email });

    // If user doesn't exist, deny login
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // Compare the submitted plain-text password with the hashed password in the DB
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Deny login if passwords do not match
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Wrong password or email", success: false });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    // Create the payload object containing data to be encoded in the JWT
    const tokenData = {
      userId: user._id,
    };

    // Generate a signed JSON Web Token (JWT) valid for 1 day
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Send a success response and attach the JWT to an HTTP-only cookie
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Prevents client-side JS from reading the cookie (protects against XSS attacks)
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "strict",
      })
      .json({ message: `Welcom back ${user.fullname}`, success: true, user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Logout user / clear cookie
 * @route   GET /api/user/logout
 */
export const logout = async (req, res) => {
  try {
    // Clear the "token" cookie by setting its value to empty and maxAge to 0
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/user/profile/update
 */
export const updateProfile = async (req, res) => {
  try {
    // Extract updated fields from the request body
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // Access the uploaded file object (requires a middleware like multer to be configured previously)
    const file = req.file;

    // Validate that essential fields are not missing
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const skillsArray = skills.split(",");

    // Extract the user ID from the request (Assumes an auth middleware injected `req.id`)
    const userId = req.id;

    // Fetch the current user document from the database
    const user = await User.findById(userId);

    // Error handling if user isn't found
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    // Apply the new values to the user document properties
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    // Save the modified document back to the database
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Send the success response with the updated user data
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
