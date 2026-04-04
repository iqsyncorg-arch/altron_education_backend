const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    imageUrl: String,
    publicId: String,
    caption: String,
    category: String
}, {
    timestamps: true
});


module.exports = mongoose.model('Gallery', GallerySchema);

