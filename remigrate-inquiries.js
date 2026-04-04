const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const Inquiry = require('./models/Inquiry.model');

async function migrateInquiries() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const backupPath = path.join(__dirname, 'data/backup/inquiries.json');
        if (!fs.existsSync(backupPath)) {
            console.error('Backup file not found:', backupPath);
            process.exit(1);
        }

        const inquiries = await fs.readJson(backupPath);
        console.log(`Found ${inquiries.length} inquiries to migrate.`);

        await Inquiry.deleteMany({});
        console.log('Cleared existing records.');

        await Inquiry.insertMany(inquiries.map(item => {
            const { id, _id, ...rest } = item;
            return rest;
        }));

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrateInquiries();
