const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/franchise.controller');
const auth = require('../middleware/auth.middleware');

// Public route for creating franchise inquiries
router.post('/', franchiseController.createInquiry);

// Protected routes for managing franchise inquiries
router.get('/', auth, franchiseController.getInquiries);
router.delete('/:id', auth, franchiseController.deleteInquiry);

module.exports = router;
