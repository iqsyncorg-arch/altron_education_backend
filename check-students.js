const mongoose = require('mongoose');
require('dotenv').config();
const Student = require('./models/Student.model');

async function checkStudents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const students = await Student.find({}).limit(5);
        console.log('Sample Student Records:');
        students.forEach(s => {
            console.log(`RID: ${s.rid}, Name: ${s.stdname}, Image: ${s.image}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkStudents();
