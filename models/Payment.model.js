const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    name: { type: String, default: 'Student' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    razorpayPaymentId: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpaySignature: { type: String, default: '' },
    status: { type: String, default: 'captured' },
    notes: { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema);
