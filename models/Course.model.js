const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        unique: true
    },
    description: String,
    duration: String,
    timing: String,
    eligibility: String,
    batchSize: String,
    fees: {
        original: Number,
        offer: Number
    },
    subjects: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);

