import "./BarberHome.css";
import Header from "../../components/Header/Header";
import RegisterSalon from "../Register-Salon/RegisterSalon";
import { getSpecificSalonDetails_ID } from "../../features/Salons/salonsSlice";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BarberHome = () => {
  const { user } = useSelector((state) => state.user);
  const { currentSalon } = useSelector((state) => state.salons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id) {
      dispatch(getSpecificSalonDetails_ID(user._id));
    }
  }, [user, dispatch]);

  return (
    <>
      <div className="barber-home">
        <Header />
        {user.role && currentSalon.length > 0 ? (
          <>
            <h2 style={{ color: "white" }}>Check Schedules</h2>
          </>
        ) : (
          <>
            <h3>Steps to register Salon</h3>
            <button onClick={() => RegisterSalon()}>
              <Link to="/register-salon">Register Salon</Link>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default BarberHome;
