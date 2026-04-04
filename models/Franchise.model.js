const mongoose = require('mongoose');

const FranchiseSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    location: String,
    district: String,
    investmentReady: String,
    type: {
        type: String,
        default: 'franchise'
    },
    status: {
        type: String,
        default: 'new'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Franchise', FranchiseSchema);

