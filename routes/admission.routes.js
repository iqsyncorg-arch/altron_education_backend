const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admission.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, admissionController.getAllAdmissions);
router.post('/', authMiddleware, admissionController.addAdmission);
router.put('/:id', authMiddleware, admissionController.updateAdmission);
router.delete('/:id', authMiddleware, admissionController.deleteAdmission);

module.exports = router;
