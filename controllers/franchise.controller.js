const Franchise = require('../models/Franchise.model');
const { sendFranchiseThankYou } = require('../utils/email');

exports.createInquiry = async (req, res) => {
    try {
        const newInquiry = await Franchise.create(req.body);

        // Send thank you email
        if (newInquiry.email) {
            await sendFranchiseThankYou(newInquiry.email, newInquiry.name);
        }

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
            const total = await Franchise.countDocuments();
            const inquiries = await Franchise.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
            res.json({ data: inquiries, total, page, limit });
        } else {
            const inquiries = await Franchise.find({}).sort({ createdAt: -1 });
            res.json(inquiries);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteInquiry = async (req, res) => {
    try {
        const deleted = await Franchise.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Franchise inquiry not found' });
        res.json({ message: 'Franchise inquiry deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

