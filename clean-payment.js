require('dotenv').config();
const mongoose = require('mongoose');
const Payment = require('./models/Payment.model');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const result = await Payment.deleteMany({ razorpayPaymentId: 'pay_TbmoDUqVdgrKzg' });
        console.log(`Deleted ${result.deletedCount} test payment records`);
        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
