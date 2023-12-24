import "./Schedules.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getBarborAppointments } from "../../features/user/userSlice";

const Schedules = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.user);
  const { currentSalon } = useSelector((state) => state.salons);

  useEffect(() => {
    dispatch(getBarborAppointments(currentSalon[0]._id));
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <p>{order.totalAmount}</p>
      ))}
    </div>
  );
};

export default Schedules;
