const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', testimonialController.getTestimonials);
router.delete('/:id', auth, testimonialController.deleteTestimonial);
router.post('/', auth, testimonialController.createTestimonial);

module.exports = router;
