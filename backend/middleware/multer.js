import multer from "multer";

/**
 * FILE UPLOAD CONFIGURATION
 * Purpose: Configures how the server handles incoming file uploads (like profile pictures).
 * 
 * Why memoryStorage? It stores the uploaded file in the server's RAM as a Buffer. 
 * This is the best practice if you plan to upload the file directly to a cloud service 
 * (like Cloudinary or AWS S3) in your controller, rather than saving it to a local disk first.
 */

// Configure storage to keep the file in memory
const storage = multer.memoryStorage();

/**
 * Middleware Export:
 * - `multer({ storage })` initializes multer with our memory storage config.
 * - `.single("file")` tells multer to expect exactly one file, and that the 
 *   HTML form field name for this file is "file". This makes the file available 
 *   in the controller as `req.file`.
 */
export const singleUpload = multer({ storage }).single("file");
