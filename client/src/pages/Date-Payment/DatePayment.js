import { useLocation, useParams } from "react-router-dom";
import "./DatePayment.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAppointment } from "../../features/Appointment/appointmentSlice";
import axios from "axios";

export const DatePayment = () => {
  const dispatch = useDispatch();
  const { salonName } = useParams();
  const { state } = useLocation();
  const { service } = state;

  const { user } = useSelector((state) => state);

  const [dateComponent, showDateComponent] = useState(true);
  const [date, setDate] = useState(new Date("12-09-2023"));
  const [time, setTime] = useState();

  const pushData = () => {
    const appointmentDetails = {
      userId: user._id,
      barberId: service.salonID,
      services: service._id,
      date: date,
      time: time,
      status: false,
      totalAmount: service.price,
    };

    //dispatch(registerAppointment(appointmentDetails));
  };
  const appointmentDetails = {
    userId: user._id,
    barberId: service.salonID,
    services: service._id,
    date: date,
    time: time,
    status: false,
    totalAmount: service.price,
  };
  const createOrder = async () => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getKey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/checkout", appointmentDetails);

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Book a Barber",
      description: "book a barber application",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:4000/payment-verification",
      prefill: {
        name: user.fullname, //whoever logins his credentials
        email: user.email,
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
  };
  return (
    <>
      <main className="date-payment">
        <div className="service-side">
          <div className="first">
            <h1>{salonName}</h1>
            <img src={`/${service.image}`} alt="not found"></img>
            <p>
              {service.name} <span>{service.price} </span>
            </p>
          </div>
          <div className="second">
            <p>{service.price}</p>
          </div>
        </div>
        <div className="date-side">
          {dateComponent ? (
            <form>
              <h3> 12-09-2023 </h3>
              <li onClick={() => setTime("10:00")}>10:00</li>
              <li onClick={() => setTime("11:00")}>11:00</li>
              <li onClick={() => setTime("12:00")}>12:00</li>
              <li onClick={() => setTime("14:00")}>14:00</li>
              <li onClick={() => setTime("15:00")}>15:00</li>
              <li onClick={() => setTime("16:00")}>16:00</li>
              <li onClick={() => setTime("17:00")}>17:00</li>

              <button
                onClick={() => {
                  showDateComponent(false);
                  createOrder();
                }}
                type="submit"
              >
                Book
              </button>
            </form>
          ) : (
            <>
              <form>
                <p>Payment Component</p>
                <button
                  onClick={() => {
                    pushData();
                  }}
                  type="submit"
                >
                  Pay
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  );
};
