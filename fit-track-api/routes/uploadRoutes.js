const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/UserModel');

const router = express.Router();

// Configure Cloudinary with your credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

// Configure multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fit-track-avatars', // A folder in Cloudinary to store images
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

// @route   POST /api/upload/avatar
// @desc    Upload a user profile picture
// @access  Private
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Find the user and update their avatar URL
    const user = await User.findById(req.user._id);
    user.avatar = req.file.path; // req.file.path contains the URL from Cloudinary
    await user.save();

    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;