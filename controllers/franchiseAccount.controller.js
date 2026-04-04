const FranchiseAccount = require('../models/FranchiseAccount.model');
const bcrypt = require('bcryptjs');

exports.createAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if account already exists
        const existing = await FranchiseAccount.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Franchise account with this email already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = await FranchiseAccount.create({
            ...req.body,
            password: hashedPassword
        });

        const accountObj = newAccount.toObject();
        delete accountObj.password;

        res.status(201).json(accountObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const accounts = await FranchiseAccount.find({}).sort({ createdAt: -1 });
        // Remove passwords before sending
        const safeAccounts = accounts.map(account => {
            const obj = account.toObject();
            delete obj.password;
            return obj;
        });
        res.json(safeAccounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const deleted = await FranchiseAccount.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Account not found' });
        res.json({ message: 'Franchise account deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updated = await FranchiseAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Account not found' });

        const updatedObj = updated.toObject();
        delete updatedObj.password;
        res.json(updatedObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

