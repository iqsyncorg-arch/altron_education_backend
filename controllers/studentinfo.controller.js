const StudentModel = require('../models/Student.model');

// Public: Verify Student by RID
exports.verifyStudent = async (req, res) => {
    try {
        const { rid } = req.params;
        const student = await StudentModel.findByRid(rid);
        if (!student) return res.status(404).json({ message: 'Student record not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error verifying student', error: error.message });
    }
};

// Admin: Get All Students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

// Admin: Add Student
exports.addStudent = async (req, res) => {
    try {
        const studentData = req.body;

        // Only generate if frontend didn't provide one
        if (!studentData.rid) {
            const lastStudent = await StudentModel.findOne({ rid: { $regex: /^\d+$/ } }).sort({ rid: -1 });
            let nextRid = 1286;
            if (lastStudent && !isNaN(parseInt(lastStudent.rid))) {
                nextRid = parseInt(lastStudent.rid) + 1;
            }
            studentData.rid = String(nextRid);
        }

        // Handle Image Upload
        if (req.file && req.file.path) {
            studentData.image = req.file.path;
        }

        const newStudent = await StudentModel.create(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error adding student', error: error.message });
    }
};

// Admin: Update Student
exports.updateStudent = async (req, res) => {
    try {
        const { rid } = req.params;
        const studentData = req.body;

        // Handle Image Upload
        if (req.file && req.file.path) {
            studentData.image = req.file.path;
        }

        const updated = await StudentModel.findOneAndUpdate(
            { rid: rid },
            { ...studentData, updatedAt: new Date() },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

// Admin: Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const { rid } = req.params;
        const deleted = await StudentModel.findOneAndDelete({ rid: rid });

        if (!deleted) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};

