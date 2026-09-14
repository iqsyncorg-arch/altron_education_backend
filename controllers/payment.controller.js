const Razorpay = require('razorpay');
const crypto = require('crypto');
const Inquiry = require('../models/Inquiry.model');
const Payment = require('../models/Payment.model');

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * Create a Razorpay order for seat reservation
 */
exports.createOrder = async (req, res) => {
    try {
        const { amount = 1, name, email, phone } = req.body;

        const options = {
            amount: Math.round(amount * 100), // amount in paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            notes: {
                student_name: name || '',
                email: email || '',
                phone: phone || ''
            }
        };

        const order = await razorpayInstance.orders.create(options);

        res.json({
            success: true,
            order_id: order.id,
            currency: order.currency,
            amount: order.amount,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Razorpay createOrder error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Razorpay payment order',
            error: error.message
        });
    }
};

/**
 * Verify Razorpay payment signature & record seat reservation in DB
 */
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            name,
            email,
            phone,
            notes,
            amount = 1
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing Razorpay payment verification parameters'
            });
        }

        // HMAC SHA256 Signature Verification
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Razorpay payment signature'
            });
        }

        // 1. Create Payment record in DB for Admin Panel
        const newPayment = await Payment.create({
            name: name || 'Student',
            email: email || '',
            phone: phone || '',
            amount: Number(amount) || 1,
            currency: 'INR',
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature,
            status: 'captured',
            notes: notes || 'Online Seat Reservation'
        });

        // 2. Also save paid reservation as an Inquiry in DB
        const newInquiry = await Inquiry.create({
            name: name || 'Student',
            fullName: name || 'Student',
            email: email || '',
            phone: phone || '',
            mobile: phone || '',
            subject: 'ONLINE SEAT RESERVATION (₹1 PAID)',
            message: `[RAZORPAY PAYMENT SUCCESS] Payment ID: ${razorpay_payment_id} | Order ID: ${razorpay_order_id} | Amount: ₹${amount} | Notes: ${notes || 'Seat Reservation'}`,
            status: 'contacted'
        });

        res.json({
            success: true,
            message: 'Payment verified successfully! Your seat has been reserved.',
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            paymentRecordId: newPayment._id,
            inquiryId: newInquiry._id
        });
    } catch (error) {
        console.error('Razorpay verifyPayment error:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    }
};

/**
 * Get all real Razorpay payment records directly from Razorpay API + DB
 */
exports.getAllPayments = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const paymentsList = [];
        const seenPaymentIds = new Set();

        // 1. Fetch real live payments directly from Razorpay Official API
        try {
            const rzpResponse = await razorpayInstance.payments.all({ count: 100 });
            if (rzpResponse && rzpResponse.items) {
                for (const item of rzpResponse.items) {
                    const studentName = item.notes?.student_name || item.notes?.name || 'Student';
                    paymentsList.push({
                        _id: item.id,
                        name: studentName,
                        email: item.email || item.notes?.email || '',
                        phone: item.contact || item.notes?.phone || '',
                        amount: item.amount ? item.amount / 100 : 1, // convert paise to INR
                        currency: item.currency || 'INR',
                        razorpayPaymentId: item.id,
                        razorpayOrderId: item.order_id || 'N/A',
                        status: item.status || 'captured',
                        notes: item.description || item.notes?.notes || 'Razorpay Online Payment',
                        method: item.method || 'online',
                        createdAt: new Date(item.created_at * 1000).toISOString()
                    });
                    seenPaymentIds.add(item.id);
                }
            }
        } catch (rzpErr) {
            console.error('Error fetching directly from Razorpay API:', rzpErr.message);
        }

        // 2. Fetch local DB Payments as fallback
        const localPayments = await Payment.find({}).sort({ createdAt: -1 }).lean();
        for (const p of localPayments) {
            if (!seenPaymentIds.has(p.razorpayPaymentId)) {
                paymentsList.push({
                    _id: p._id.toString(),
                    name: p.name || 'Student',
                    email: p.email || '',
                    phone: p.phone || '',
                    amount: p.amount || 1,
                    currency: p.currency || 'INR',
                    razorpayPaymentId: p.razorpayPaymentId,
                    razorpayOrderId: p.razorpayOrderId || 'N/A',
                    status: p.status || 'captured',
                    notes: p.notes || 'Seat Reservation',
                    createdAt: new Date(p.createdAt).toISOString()
                });
                seenPaymentIds.add(p.razorpayPaymentId);
            }
        }

        // Sort all payments by createdAt descending
        paymentsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        if (page) {
            const total = paymentsList.length;
            const paginated = paymentsList.slice(skip, skip + limit);
            res.json({ data: paginated, total, page, limit });
        } else {
            res.json(paymentsList);
        }
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Delete a payment record
 */
exports.deletePayment = async (req, res) => {
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Payment record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
