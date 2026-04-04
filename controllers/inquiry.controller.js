const Inquiry = require('../models/Inquiry.model');

exports.createInquiry = async (req, res) => {
    try {
        const newInquiry = await Inquiry.create(req.body);
        res.status(201).json(newInquiry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (page) {
            const total = await Inquiry.countDocuments();
            const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
            res.json({ data: inquiries, total, page, limit });
        } else {
            const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
            res.json(inquiries);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllInquiries = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (page) {
            const total = await Inquiry.countDocuments();
            const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
            res.json({ data: inquiries, total, page, limit });
        } else {
            const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
            res.json(inquiries);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteInquiry = async (req, res) => {
    try {
        const deleted = await Inquiry.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Inquiry not found' });
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

