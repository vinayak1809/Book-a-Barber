import { useLocation, useParams } from "react-router-dom";
import "./DatePayment.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAppointment } from "../../features/Appointment/appointmentSlice";

export const DatePayment = () => {
  const { salonName } = useParams();
  const { state } = useLocation();
  const { service } = state;
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date("12-09-2023"));
  const [time, setTime] = useState();

  const pushData = (e) => {
    e.preventDefault();
    const appointmentDetails = {
      userId: user._id,
      barberId: service.salonID,
      services: service._id,
      date: date,
      time: time,
      status: true,
    };

    dispatch(registerAppointment(appointmentDetails));
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
          <form onSubmit={(e) => pushData(e)}>
            <h3> 12-09-2023 </h3>
            <li onClick={() => setTime("10:00")}>10:00</li>
            <li onClick={() => setTime("11:00")}>11:00</li>
            <li onClick={() => setTime("12:00")}>12:00</li>
            <li onClick={() => setTime("14:00")}>14:00</li>
            <li onClick={() => setTime("15:00")}>15:00</li>
            <li onClick={() => setTime("16:00")}>16:00</li>
            <li onClick={() => setTime("17:00")}>17:00</li>

            <button type="submit">Pay</button>
          </form>
        </div>
      </main>
    </>
  );
};
