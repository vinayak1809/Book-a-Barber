const checkAsyncErrors = require("./../middleware/catchAsyncErros");

const Appointment = require("./../models/Appointments");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

const checkout = checkAsyncErrors(async (req, res) => {
  var options = {
    amount: Number(req.body.totalAmount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  const postData = {
    ...req.body,
    razorpay_order_id: order.id,
    totalAmount: order.amount,
  };

  console.log(postData, "postData");
  const appointment = await new Appointment({ ...postData });
  appointment.save();

  res.status(200).json({ status: true, order });
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
    const appointment = Appointment.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        status: true,
      },
      { new: true }
    ).then((done) => console.log(done, "appoinment updated "));

    res.redirect(
      `http://localhost:3000/Orders?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ message: "payment  unsuccessfull", status: false });
  }
});

module.exports = { checkout, paymentVerification };
