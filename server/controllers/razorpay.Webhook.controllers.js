import crypto from "crypto";
import User from "../models/user.model.js";
import { PLANS } from "../config/plan.js";


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planType,
    } = req.body;

    const userId = req.user._id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const plan = PLANS[planType];

    await User.findByIdAndUpdate(userId, {
      $inc: {
        credits: plan.credits,
      },
      plan: plan.plan,
    });

    res.json({
      success: true,
      message: "Payment Successful",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};