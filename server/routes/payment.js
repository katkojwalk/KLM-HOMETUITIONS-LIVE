const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const auth = require('../middleware/auth');
const Payment = require('../models/Payment');
const User = require('../models/User');

// Initialize Razorpay
// If env vars are missing, we gracefully handle it so the server doesn't crash
let razorpay;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (error) {
  console.log("Razorpay initialization failed:", error);
}

// @route   POST /api/payment/create-order
// @desc    Create a Razorpay order for 500 INR
// @access  Private
router.post('/create-order', auth, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ message: 'Payment gateway is not configured yet.' });
    }

    const amount = 500; // Registration fee in INR
    const options = {
      amount: amount * 100, // Amount is in smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${req.user.id}_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Some error occurred while creating order' });
    }

    // Save initial payment record
    const payment = new Payment({
      userId: req.user.id,
      razorpayOrderId: order.id,
      amount: amount,
      status: 'created'
    });
    await payment.save();

    res.json(order);
  } catch (error) {
    console.error('Error in create-order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature
// @access  Private
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Update Payment record
      const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (payment) {
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.status = 'successful';
        await payment.save();
      }

      // Update User
      await User.findByIdAndUpdate(req.user.id, { hasPaidRegistrationFee: true });

      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      // Invalid signature
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error('Error in verify payment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
