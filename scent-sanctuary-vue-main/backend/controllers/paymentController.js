import asyncHandler from '../utils/asyncHandler.js';
import Order from '../models/orderModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Setup Razorpay instance
const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_razorpay_key_id') {
        throw new Error('Razorpay keys not configured');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// @desc    Create Razorpay Order
// @route   POST /api/v1/payments/create-order
// @access  Private
const createPaymentOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const orderDB = await Order.findById(orderId);
    if (!orderDB) {
        res.status(404);
        throw new Error('Order to pay not found');
    }

    const instance = getRazorpayInstance();
    const options = {
        amount: Math.round(orderDB.totalPrice * 100), // amount in the smallest currency unit (paise for INR)
        currency: 'INR',
        receipt: `receipt_order_${orderDB._id}`,
    };

    const razorpayOrder = await instance.orders.create(options);
    
    if(!razorpayOrder) {
        res.status(500);
        throw new Error('Failed to create Razorpay order');
    }

    res.json({
        id: razorpayOrder.id,
        currency: razorpayOrder.currency,
        amount: razorpayOrder.amount,
    });
});

// @desc    Verify Razorpay Payment
// @route   POST /api/v1/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Update order in DB
        const order = await Order.findById(orderId);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: razorpay_payment_id,
                status: 'paid',
                update_time: Date.now().toString(),
                email_address: req.user.email,
            };
            order.razorpayOrderId = razorpay_order_id;
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;

            await order.save();
            res.json({ message: 'Payment successfully verified', success: true });
        } else {
             res.status(404);
             throw new Error('Order not found for updating payment status');
        }
    } else {
        res.status(400);
        throw new Error('Payment signature verification failed');
    }
});

export { createPaymentOrder, verifyPayment };
