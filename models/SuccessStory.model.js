const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema({
    title: String,
    description: String,
    youtubeUrl: String,
    thumbnail: String
}, {
    timestamps: true
});

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);

