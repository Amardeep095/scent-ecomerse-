import express from 'express';
import { createPaymentOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-order', protect, createPaymentOrder);
router.post('/verify', protect, verifyPayment);

// Provide Razorpay key ID to frontend securely via an API
router.get('/config', protect, (req, res) => {
    res.json({ key_id: process.env.RAZORPAY_KEY_ID || '' });
});

export default router;
