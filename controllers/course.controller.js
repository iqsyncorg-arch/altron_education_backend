const Course = require('../models/Course.model');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCourseBySlug = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateCourse = async (req, res) => {
    try {
        const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Course not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
