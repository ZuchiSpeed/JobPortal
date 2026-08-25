import jwt from "jsonwebtoken";

// Define an asynchronous middleware function.
// 'next' is a callback function that passes control to the next middleware or route handler.
const isAuthenticated = async (req, res, next) => {
  try {
    // Extract the JWT token from the HTTP-only cookie named "token"
    const token = req.cookies.token;

    // If no cookie is present, the user is not logged in. Deny access with a 401 Unauthorized status.
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    // Verify the token's signature using the secret key and decode its payload.
    // If the token is invalid or expired, jwt.verify() throws an error and jumps to the catch block.
    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    // If verification fails or payload is empty, deny access.
    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        success: false,
      });
    }

    // Attach the decoded user ID to the request object.
    // This allows the next controller (e.g., updateProfile) to know WHICH user is making the request via req.id
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
