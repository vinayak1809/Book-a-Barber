import "./Schedules.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getBarborAppointments,
  getUserAppointments,
} from "../../features/user/userSlice";
import { updateBarberAppointment } from "../../features/Appointment/appointmentSlice";
import payment from "../../utils/payment";

const Schedules = () => {
  const dispatch = useDispatch();

  const { orders, user } = useSelector((state) => state.user);
  const { currentSalon } = useSelector((state) => state.salons);

  const [orderStatus, setOrderStatus] = useState({});

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  useEffect(() => {
    user.role === "barber"
      ? dispatch(getBarborAppointments(currentSalon[0]._id))
      : dispatch(getUserAppointments());
  }, [dispatch]);

  const update = (id) => {
    dispatch(updateBarberAppointment({ id: id, status: orderStatus[id] }));
  };

  return (
    //amount column
    <div>
      <h2>Appointments</h2>
      <div className="table">
        {user.role === "user" ? (
          <table>
            <tr>
              <td>ID</td>
              <td>Salon Name</td>
              <td>Service Name</td>
              <td>Date & Time</td>
              <td>Status</td>
            </tr>

            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.services[0].serviceName}</td>
                <td>9145789245</td>
                <td>
                  {order.date} | {order.time}
                </td>
                {order.status === "accepted" ? (
                  <button onClick={() => payment(order._id, order.totalAmount)}>
                    Payment
                  </button>
                ) : order.status === "payment-done" ? (
                  <p>Payment Done</p>
                ) : (
                  <p>Requested</p>
                )}
              </tr>
            ))}
          </table>
        ) : (
          <table>
            <tr>
              <td>ID</td>
              <td>Service Name</td>
              <td>Phone</td>
              <td>Date & Time</td>
              <td>Status</td>
            </tr>

            {orders.map((order) => (
              <tr>
                <td>{order._id}</td>
                <td>{order.services[0].serviceName}</td>
                <td>9145789245</td>
                <td>{order.time}</td>
                <td>
                  {order.status !== "payment-done" ? (
                    <select
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      value={orderStatus[order._id] || order.status}
                    >
                      <option value="requested">Requested</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <p>Payment Done</p>
                  )}
                </td>

                <button onClick={() => update(order._id)}>Update</button>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Schedules;
