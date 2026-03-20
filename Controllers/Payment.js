import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'


dotenv.config()


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// checkout
export const checkout = async (req, res) => {
  try {

    const { amount, cartItems, userShipping, userId } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// verify payment
export const verify = async (req, res) => {

  try {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      payStatus: "paid"
    });

    await payment.save();

    res.json({
      success: true,
      message: "Payment Successful"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};