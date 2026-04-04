const Testimonial = require('../models/Testimonial.model');

exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const newTestimonial = await Testimonial.create(req.body);
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

