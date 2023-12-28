import axios from "axios";

const payment = async (id, totalAmount) => {
  const {
    data: { RZP_key },
  } = await axios.get("http://localhost:4000/api/getKey");

  const {
    data: { order },
  } = await axios.put(`http://localhost:4000/update-user-appointment/${id}`, {
    totalAmount: totalAmount,
  });

  const options = {
    key: RZP_key,
    amount: order.amount,
    currency: order.currency,
    name: "Book a Barber",
    description: "book a barber application",
    image: "https://example.com/your_logo",
    order_id: order.id,
    handler: async (response) => {
      await axios.put("http://localhost:4000/payment-verification", response, {
        withCredentials: true,
      });
    },
    prefill: {
      name: "someone", //whoever logins his credentials
      email: "user.email",
      contact: "9000090000", //user.contactInformation
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var razor = new window.Razorpay(options);

  razor.open();
  return <></>;
};

export default payment;
