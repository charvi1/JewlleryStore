const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "JewelryStore/Products", // Cloudinary folder name
    format: async (req, file) => "webp", // Convert all images to WebP
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Resize
  },
});

// ✅ Configure Multer
const upload = multer({ storage });

module.exports = upload;
