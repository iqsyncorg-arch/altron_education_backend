const mongoose = require('mongoose');

const RecruitmentSchema = new mongoose.Schema({
    jobTitle: String,
    department: String,
    location: String,
    type: String,
    description: String,
    requirements: [String],
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema);

