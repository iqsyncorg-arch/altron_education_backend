const Center = require('../models/Center.model');

exports.createCenter = async (req, res) => {
    try {
        const newCenter = await Center.create(req.body);
        res.status(201).json(newCenter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCenters = async (req, res) => {
    try {
        const centers = await Center.find({}).sort({ createdAt: -1 });
        res.json(centers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCenter = async (req, res) => {
    try {
        const updated = await Center.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Center not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCenter = async (req, res) => {
    try {
        const deleted = await Center.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Center not found' });
        res.json({ message: 'Center deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

