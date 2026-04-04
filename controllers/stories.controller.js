const Story = require('../models/SuccessStory.model');

exports.getStories = async (req, res) => {
    try {
        const stories = await Story.find({}).sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const deleted = await Story.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Story not found' });
        res.json({ message: 'Story deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createStory = async (req, res) => {
    try {
        const newStory = await Story.create(req.body);
        res.status(201).json(newStory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

