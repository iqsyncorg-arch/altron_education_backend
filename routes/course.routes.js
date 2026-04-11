const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', courseController.getCourses);
router.get('/:slug', courseController.getCourseBySlug);
router.delete('/:id', auth, courseController.deleteCourse);
router.put('/:id', auth, courseController.updateCourse);
router.post('/', auth, courseController.createCourse);

module.exports = router;
