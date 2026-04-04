const express = require('express');
const router = express.Router();
const Recruitment = require('../models/Recruitment.model');
const auth = require('../middleware/auth.middleware');

const { sendRecruitmentThankYou } = require('../utils/email');

// Public route for applying
router.post('/', async (req, res) => {
    try {
        const newRecruitment = await Recruitment.create(req.body);

        // Send thank you email
        if (newRecruitment.email) {
            await sendRecruitmentThankYou(newRecruitment.email, newRecruitment.contactPerson || newRecruitment.organisationName || 'valued partner');
        }

        res.status(201).json(newRecruitment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected routes for managing applications
router.get('/', auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (page) {
            const total = await Recruitment.countDocuments();
            const recruitments = await Recruitment.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
            res.json({ data: recruitments, total, page, limit });
        } else {
            const recruitments = await Recruitment.find({}).sort({ createdAt: -1 });
            res.json(recruitments);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const deleted = await Recruitment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Recruitment not found' });
        res.json({ message: 'Recruitment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

