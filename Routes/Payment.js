import express from "express";
import Razorpay from "razorpay";
import { Payment } from "../Models/Payment.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_gHH71104csjcq",
  key_secret: "YOUR_SECRET_HERE",
});

router.post("/checkout", async (req, res) => {
  try {
    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderid: order.id,   // lowercase to match frontend
      amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;