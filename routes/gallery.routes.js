const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const { upload } = require('../middleware/cloudinary.config');
const auth = require('../middleware/auth.middleware');

router.get('/', galleryController.getImages);
router.post('/', auth, upload.single('image'), galleryController.createImage);
router.delete('/:id', auth, galleryController.deleteImage);

module.exports = router;
