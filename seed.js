const fs = require('fs-extra');
const path = require('path');

const bcrypt = require('bcryptjs');

const COURSES_FILE = path.join(__dirname, 'data/courses.json');
const STORIES_FILE = path.join(__dirname, 'data/stories.json');
const TESTIMONIALS_FILE = path.join(__dirname, 'data/testimonials.json');
const GALLERY_FILE = path.join(__dirname, 'data/gallery.json');
const ADMIN_FILE = path.join(__dirname, 'data/admins.json');

const seedData = async () => {
    try {
        // Seed Admin
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admins = [
            { id: 1, email: 'admin@altron.com', password: hashedPassword, createdAt: new Date() }
        ];
        await fs.writeJson(ADMIN_FILE, admins, { spaces: 2 });
        console.log('Admin seeded: admin@altron.com / admin123');

        // Seed Courses
        const courses = [
            {
                id: 1,
                title: 'Diploma Course in CCTV Surveillance System',
                slug: 'cctv-diploma',
                description: 'Practical Training Program',
                duration: '10 Days (Regular) / 1 Month (Fast Track)',
                timing: '10:00 AM – 05:30 PM',
                eligibility: 'SSLC / HSC / Diploma / Degree',
                batchSize: '1 or 2 Candidates Only',
                fees: { original: 15900, offer: 10900 },
                subjects: [
                    'Introduction to CCTV Systems',
                    'Types of Cameras (Analog, IP, HD)',
                    'Camera Selection and Placement',
                    'DVR/NVR Installation & Configuration',
                    'Cable Routing and Connections',
                    'Network Configuration for IP Cameras',
                    'Video Storage and Retrieval',
                    'Remote Monitoring Setup',
                    'Troubleshooting Common Issues'
                ],
                createdAt: new Date()
            },
            {
                id: 2,
                title: 'Fire Alarm Installation Training',
                slug: 'fire-alarm-training',
                description: 'Professional Certification in Life Safety Systems',
                duration: 'Flexible Schedules',
                timing: '10:00 AM – 04:00 PM',
                eligibility: 'Open to All Seekers',
                batchSize: 'Small Groups',
                fees: { original: 12000, offer: 8500 },
                subjects: [
                    'Smoke Detection',
                    'Heat & Flame Sensors',
                    'Fire Alarm Control Panels (FACP)',
                    'Emergency Notification Systems',
                    'Circuit Wiring & Integration',
                    'Maintenance and Testing'
                ],
                createdAt: new Date()
            },
            {
                id: 3,
                title: 'Access Control & Biometric Training',
                slug: 'access-biometric-training',
                description: 'Security Protocols and Hardware Integration',
                duration: '7 Days Program',
                timing: '10:30 AM – 05:00 PM',
                eligibility: 'Basic Computer Knowledge',
                batchSize: 'Limited Seats',
                fees: { original: 14000, offer: 9900 },
                subjects: [
                    'Fingerprint & Face Recognition',
                    'Magnetic Lock Installation',
                    'RFID Card Systems',
                    'Attendance Software Integration',
                    'Power Supply & Backup',
                    'Admin Software Configuration'
                ],
                createdAt: new Date()
            },
            {
                id: 4,
                title: 'Professional Course in Safety & Security Engineering',
                slug: 'engineering',
                description: 'Elite Advanced Training Program',
                duration: '4 Weeks + On-Site Practical',
                timing: '10:00 AM – 05:30 PM',
                eligibility: 'SSLC / HSC / ITI / Diploma / Any Degree (Below 35)',
                batchSize: 'Small Groups',
                fees: { original: 49000, offer: 33000 },
                subjects: [
                    'CCTV Surveillance',
                    'Fire Alarm Systems',
                    'Access Control',
                    'Biometric Systems',
                    'Home Security Systems'
                ],
                createdAt: new Date()
            }
        ];
        await fs.writeJson(COURSES_FILE, courses, { spaces: 2 });

        // Seed Success Stories
        const stories = [
            { id: 1, title: 'Founder Story', youtubeUrl: 'https://youtube.com/watch?v=IuTzmfI8PPA', description: 'Hear from our founder.', createdAt: new Date() },
            { id: 2, title: 'Top 5 Reasons', youtubeUrl: 'https://youtube.com/watch?v=SNCFf6KhE-A', description: 'Why choose Altron.', createdAt: new Date() }
        ];
        await fs.writeJson(STORIES_FILE, stories, { spaces: 2 });

        // Seed Testimonials
        const testimonials = [
            {
                id: 1,
                studentName: 'Suresh Babu',
                courseName: 'CCTV Installation',
                reviewText: 'Excellent training with hands-on experience. Got placed within 2 weeks of completing the course!',
                avatar: 'S',
                type: 'text',
                createdAt: new Date()
            },
            {
                id: 2,
                studentName: 'Rajesh Kumar',
                courseName: 'CCTV Technician',
                videoUrl: 'https://youtube.com/watch?v=rajesh',
                type: 'video',
                reviewText: 'Altron Academy changed my life completely.',
                createdAt: new Date()
            }
        ];
        await fs.writeJson(TESTIMONIALS_FILE, testimonials, { spaces: 2 });

        // Seed Gallery
        const gallery = [
            { id: 1, imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9', caption: 'Training Lab', category: 'Lab', createdAt: new Date() }
        ];
        await fs.writeJson(GALLERY_FILE, gallery, { spaces: 2 });

        console.log('JSON Data seeded successfully!');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
};

seedData();
