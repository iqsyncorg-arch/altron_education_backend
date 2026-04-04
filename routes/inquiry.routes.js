const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');
const auth = require('../middleware/auth.middleware');

// Public route for creating inquiries
router.post('/', inquiryController.createInquiry);

// Protected routes for managing inquiries
router.get('/', auth, inquiryController.getInquiries);
router.delete('/:id', auth, inquiryController.deleteInquiry);

module.exports = router;
