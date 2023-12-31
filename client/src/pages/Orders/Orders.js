import "./Orders.css";
import Header from "../../components/Header/Header";
import { getUserAppointments } from "../../features/Appointment/appointmentSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Orders = () => {
  const dispatch = useDispatch();

  const { appointments } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(getUserAppointments());
  }, [dispatch]);

  return (
    <div className="top4">
      <Header></Header>
      <div className="orders-page">
        <div className="upcoming-orders">
          <h2>Upcoming</h2>
          {appointments.map((link, index) => (
            <div className="up-order">
              <h4>{link.date}</h4>
              <p>{link.serviceName}</p>
            </div>
          ))}
        </div>
        <div className="completed-orders">
          <h2>Completed</h2>
          <div className="cp-order">
            <h4>July 26,2011</h4>
            <p>Beard</p>
          </div>
          <div className="cp-order">
            <h4>May 12,2011</h4>
            <p>Haircut</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
