const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Global Mongoose Configuration
mongoose.set('toJSON', { virtuals: true });
mongoose.set('toObject', { virtuals: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));



// CORS Configuration
const allowedOrigins = [
    'https://altronedu.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://altroneducation.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Altron Academy API (MongoDB Atlas) is running...');
});


const authMiddleware = require('./middleware/auth.middleware');

// Import Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/inquiries', require('./routes/inquiry.routes'));
app.use('/api/stories', require('./routes/stories.routes')); // GET public, POST protected inside route if needed
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/gallery', require('./routes/gallery.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/recruitment', require('./routes/recruitment.routes'));
app.use('/api/franchise', require('./routes/franchise.routes'));
app.use('/api/centers', require('./routes/center.routes'));
app.use('/api/studentinfo', require('./routes/studentinfo.routes'));
app.use('/api/admissions', require('./routes/admission.routes'));
app.use('/api/franchise-accounts', require('./routes/franchiseAccount.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/chat', require('./routes/chat.routes'));




// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
