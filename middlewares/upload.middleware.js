const multer = require("multer");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({ dest: 'uploads/' });

const uploadImageCloud = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: 'uploads' });
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    throw new Error('Cloudinary upload failed');
  }
};

module.exports = { upload, uploadImageCloud };