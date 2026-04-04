const mongoose = require('mongoose');

const CenterSchema = new mongoose.Schema({
    name: String,
    location: String,
    address: String,
    phone: String,
    mobile: String,
    contactPerson: String,
    email: String,
    timing: String,
    type: String,
    mapLink: String,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Center', CenterSchema);


