import { PLANS } from "../config/plan.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/user.model.js";
export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;

    const plan = PLANS[planType];

    if (!plan || plan.price === 0) {
      return res.status(400).json({
        message: "Invalid paid plan",
      });
    }

    const options = {
      amount: plan.price * 100, // Razorpay accepts paise
      currency: "INR",
    //   receipt: `receipt_${userId}_${Date.now()}`,
        receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      plan,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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