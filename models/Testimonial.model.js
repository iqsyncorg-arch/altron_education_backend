const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    studentName: String,
    courseName: String,
    reviewText: String,
    avatar: String,
    type: {
        type: String,
        enum: ['text', 'video'],
        default: 'text'
    },
    videoUrl: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);

