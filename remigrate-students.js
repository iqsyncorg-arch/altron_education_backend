const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const Student = require('./models/Student.model');

async function migrateStudents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const studentBackupPath = path.join(__dirname, 'data/backup/students.json');
        if (!fs.existsSync(studentBackupPath)) {
            console.error('Student backup file not found:', studentBackupPath);
            process.exit(1);
        }

        const students = await fs.readJson(studentBackupPath);
        console.log(`Found ${students.length} students to migrate.`);

        // Clear existing students to avoid duplicates or incomplete records
        await Student.deleteMany({});
        console.log('Cleared existing student records.');

        // Insert in batches
        const batchSize = 100;
        for (let i = 0; i < students.length; i += batchSize) {
            const batch = students.slice(i, i + batchSize).map(s => {
                const { _id, id, ...rest } = s; // Remove local IDs
                return rest;
            });
            await Student.insertMany(batch);
            console.log(`Inserted batch ${i / batchSize + 1}`);
        }

        console.log('Student migration completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrateStudents();
