const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { upload } = require('../middleware/cloudinary.config');

// POST /api/upload - Requires auth and single image in 'image' field
router.post('/', authMiddleware, upload.single('image'), uploadController.uploadImage);

module.exports = router;
