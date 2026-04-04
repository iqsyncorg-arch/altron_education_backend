const mongoose = require('mongoose');

const FranchiseAccountSchema = new mongoose.Schema({
    centerName: String,
    fullAddress: String,
    primaryPhone: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    personName: String,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'franchise'
    }
}, {
    timestamps: true
});

// Helper for backward compatibility or simple find
FranchiseAccountSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};

module.exports = mongoose.model('FranchiseAccount', FranchiseAccountSchema);

