const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admin.model');
const FranchiseAccount = require('../models/FranchiseAccount.model');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;
        let role = '';

        // 1. Check if user is an admin
        user = await Admin.findOne({ email });
        if (user) {
            role = 'admin';
        } else {
            // 2. Check if user is a franchise account
            user = await FranchiseAccount.findOne({ email });
            if (user) {
                role = 'franchise';
            }
        }

        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { id: user._id, email: user.email, role },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        );

        res.json({ token, role, email: user.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verify = (req, res) => {
    res.json({ valid: true, user: req.user });
};



