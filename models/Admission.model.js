const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
    course_information: {
        course_name: String,
        course_code: String,
        registration_number: String,
        application_number: String,
        passport_photo: String
    },
    biographical_information: {
        full_name: String,
        place_of_birth: String,
        state_country: String,
        religion: String,
        nationality: String,
        mother_tongue: String,
        sex: String,
        date_of_birth: String,
        blood_group: String,
        permanent_address: String,
        telephone_number: String,
        mobile_number: String,
        email: String
    },
    education_details: {
        qualifying_exam_name: String,
        year_of_passing: String,
        number_of_attempts: String,
        affiliating_body_university: String,
        institution_last_studied: String
    },
    declaration: {
        parent_name: String,
        parent_signature: String,
        student_name: String,
        candidate_signature: String,
        place: String,
        date: String
    },
    additional_information: {
        reason_for_interest_1: String,
        reason_for_interest_2: String,
        reason_for_interest_3: String
    },
    attachments_required: {
        application_fee: String,
        registration_fee_nri: String,
        certificates_and_marksheets: String,
        passport_photos: String
    },
    franchiseId: {
        type: mongoose.Schema.Types.Mixed, // Keeping it mixed to handle legacy IDs if needed
        default: null
    },
    franchiseEmail: {
        type: String,
        default: 'admin'
    },
    addedByRole: {
        type: String,
        enum: ['admin', 'franchise'],
        default: 'admin'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admission', AdmissionSchema);

