import "./Schedules.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getBarborAppointments,
  getUserAppointments,
} from "../../features/Appointment/appointmentSlice";
import { updateBarberAppointment } from "../../features/Appointment/appointmentSlice";
import payment from "../../utils/payment";

const Schedules = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appointments } = useSelector((state) => state.appointment);
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

            {appointments.map((appointment) => (
              <tr>
                <td>{appointment._id}</td>
                <td>{appointment.services[0].serviceName}</td>
                <td>9145789245</td>
                <td>
                  {appointment.date} | {appointment.time}
                </td>
                {appointment.status === "accepted" ? (
                  <button
                    onClick={() =>
                      payment(appointment._id, appointment.totalAmount)
                    }
                  >
                    Payment
                  </button>
                ) : appointment.status === "payment-done" ? (
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

            {appointments.map((appointment) => (
              <tr>
                <td>{appointment._id}</td>
                <td>{appointment.services[0].serviceName}</td>
                <td>9145789245</td>
                <td>{appointment.time}</td>
                <td>
                  {appointment.status !== "payment-done" ? (
                    <select
                      onChange={(e) =>
                        handleStatusChange(appointment._id, e.target.value)
                      }
                      value={orderStatus[appointment._id] || appointment.status}
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

                <button onClick={() => update(appointment._id)}>Update</button>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Schedules;
