import DataUriParser from "datauri/parser.js";
import path from "path";

/**
 * Converts a Multer file object into a Data URI string.
 * Cloudinary's API accepts Data URIs for direct uploads from the server.
 *
 * @param {Object} file - The Multer file object (contains buffer and originalname)
 * @returns {Object} - An object containing the Data URI content
 */

const getDataUri = (file) => {
  const parser = new DataUriParser();

  // Extract the file extension (e.g., ".pdf", ".png") from the original filename
  const extName = path.extname(file.originalname).toString();

  // Format the file buffer into a Data URI string
  return parser.format(extName, file.buffer);
};

export default getDataUri;
