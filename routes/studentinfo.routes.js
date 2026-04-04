const express = require('express');
const router = express.Router();
const studentinfoController = require('../controllers/studentinfo.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { upload } = require('../middleware/cloudinary.config');

// Public: Verify Student by RID (Authenticity Verification)
router.get('/verify/:rid', studentinfoController.verifyStudent);

// Admin: Get all students
router.get('/', authMiddleware, studentinfoController.getAllStudents);

// Admin: Add new student
router.post('/', authMiddleware, upload.single('image'), studentinfoController.addStudent);

// Admin: Update student by rid
router.put('/:rid', authMiddleware, upload.single('image'), studentinfoController.updateStudent);

// Admin: Delete student by rid
router.delete('/:rid', authMiddleware, studentinfoController.deleteStudent);

module.exports = router;
