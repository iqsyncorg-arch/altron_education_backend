const mongoose = require('mongoose');

const RecruitmentSchema = new mongoose.Schema({
    date: String,
    organisationName: String,
    address: String,
    contactPerson: String,
    landline: String,
    mobile: String,
    email: String,
    website: String,
    requiredEmployeesNo: String,
    designation: String,
    qualification: String,
    startingSalary: String,
    conveyance: String,
    accommodation: String,
    uniform: String,
    vehicle: String,
    esic: String,
    pf: String,
    mediClaim: String,
    projectIncentive: String,
    status: {
        type: String,
        enum: ['pending', 'processed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema);

