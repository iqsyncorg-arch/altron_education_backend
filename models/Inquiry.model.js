const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    fullName: String,
    name: String,
    email: String,
    phone: String,
    mobile: String,
    subject: String,
    message: String,
    requirements: String,
    status: {
        type: String,
        enum: ['new', 'contacted', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Inquiry', InquirySchema);


