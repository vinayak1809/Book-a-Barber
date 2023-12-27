const checkAsyncErrors = require("./../middleware/catchAsyncErros");
const ErrorHandler = require("../utils/errorHandler");

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Appointment = require("./../models/Appointments");

const instance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

const checkout = checkAsyncErrors(async (req, res) => {
  const appointment = await new Appointment({ ...req.body });
  appointment.save();

  res.status(200).json({ status: true });
});

//payment related route
const updateUserAppointment = checkAsyncErrors(async (req, res) => {
  const app = Appointment.findById({ _id: req.params.id });

  if (app) {
    var options = {
      amount: Number(req.body.totalAmount * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    await Appointment.findOneAndUpdate(
      { _id: req.params.id },
      {
        razorpay_order_id: order.id,
      }
    );

    res.status(200).json({ status: true, order });
  }
});

const paymentVerification = checkAsyncErrors(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected_signature = crypto
    .createHmac("sha256", process.env.RZP_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expected_signature === razorpay_signature) {
    const a = await Appointment.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        status: "payment-done",
      },
      { new: true }
    );

    res.status(200).json({ status: true, orders: a });

    // res.redirect(
    //   `http://localhost:3000/Orders?reference=${razorpay_payment_id}`
    // );
  } else {
    return new next(ErrorHandler("payment unsuccessfull", 400));
  }
});

module.exports = { checkout, updateUserAppointment, paymentVerification };
