const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const Center = require('./models/Center.model');

async function migrateCenters() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const centerBackupPath = path.join(__dirname, 'data/backup/centers.json');
        if (!fs.existsSync(centerBackupPath)) {
            console.error('Center backup file not found:', centerBackupPath);
            process.exit(1);
        }

        const centers = await fs.readJson(centerBackupPath);
        console.log(`Found ${centers.length} centers to migrate.`);

        await Center.deleteMany({});
        console.log('Cleared existing center records.');

        await Center.insertMany(centers.map(c => {
            const { id, _id, ...rest } = c;
            return rest;
        }));

        console.log('Center migration completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrateCenters();
