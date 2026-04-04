const AdmissionModel = require('../models/Admission.model');

exports.getAllAdmissions = async (req, res) => {
    try {
        let admissions;

        // Filter if user is a franchise
        if (req.user && req.user.role === 'franchise') {
            admissions = await AdmissionModel.find({ franchiseEmail: req.user.email }).sort({ createdAt: -1 });
        } else {
            admissions = await AdmissionModel.find({}).sort({ createdAt: -1 });
        }

        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admissions', error: error.message });
    }
};


exports.addAdmission = async (req, res) => {
    try {
        const admissionData = {
            ...req.body,
            franchiseId: req.user.role === 'franchise' ? req.user.id : null,
            franchiseEmail: req.user.role === 'franchise' ? req.user.email : 'admin',
            addedByRole: req.user.role
        };
        const newAdmission = await AdmissionModel.create(admissionData);
        res.status(201).json(newAdmission);
    } catch (error) {
        res.status(500).json({ message: 'Error adding admission', error: error.message });
    }
};


exports.updateAdmission = async (req, res) => {
    try {
        const { id } = req.params;
        const admissionData = req.body;
        const updated = await AdmissionModel.findByIdAndUpdate(id, admissionData, { new: true });
        if (!updated) return res.status(404).json({ message: 'Admission not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating admission', error: error.message });
    }
};

exports.deleteAdmission = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await AdmissionModel.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Admission not found' });
        res.status(200).json({ message: 'Admission deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admission', error: error.message });
    }
};

