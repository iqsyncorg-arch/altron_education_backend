const express = require('express');
const router = express.Router();
const centerController = require('../controllers/center.controller');
const auth = require('../middleware/auth.middleware');

// Public route for viewing centers
router.get('/', centerController.getCenters);

// Protected routes for managing centers
router.post('/', auth, centerController.createCenter);
router.put('/:id', auth, centerController.updateCenter);
router.delete('/:id', auth, centerController.deleteCenter);

module.exports = router;
