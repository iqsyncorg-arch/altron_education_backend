const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    rid: {
        type: String,
        unique: true
    },
    roll: String,
    stdname: String,
    fathersname: String,
    pyear: String,
    cgpa: String,
    subject: String,
    image: String,
    dob: String, // String to match legacy format
    gender: String, // String to match legacy format (used for Place/Location)
    address: String,
    mnam: String,
    c1: String,
    c2: String,
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
});

StudentSchema.statics.findByRid = function (rid) {
    return this.findOne({ rid: String(rid) });
};

module.exports = mongoose.model('Student', StudentSchema);


