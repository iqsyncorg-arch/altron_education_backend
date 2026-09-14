require('dotenv').config();
const mongoose = require('mongoose');
const Payment = require('./models/Payment.model');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const existing = await Payment.findOne({ razorpayPaymentId: 'pay_TbmoDUqVdgrKzg' });
        if (!existing) {
            await Payment.create({
                name: 'Sanjay S N',
                email: 'snsanjay2002@gmail.com',
                phone: '+91 7868 000645',
                amount: 1,
                currency: 'INR',
                razorpayPaymentId: 'pay_TbmoDUqVdgrKzg',
                razorpayOrderId: 'order_TbmnPnkzQV7NLR',
                status: 'captured',
                notes: 'Seat Reservation Fee (₹1)'
            });
            console.log('Seed payment added successfully');
        } else {
            console.log('Payment already exists');
        }

        mongoose.disconnect();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
