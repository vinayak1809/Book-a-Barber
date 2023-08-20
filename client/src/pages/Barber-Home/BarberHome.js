import "./BarberHome.css";
import Header from "../../components/Header/Header";
import RegisterSalon from "../Register-Salon/RegisterSalon";
import { getSpecificSalonDetails_ID } from "../../features/Salons/salonsSlice";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const BarberHome = () => {
  const { user } = useSelector((state) => state);
  const { salons } = useSelector((state) => state.salons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user._id) {
      dispatch(getSpecificSalonDetails_ID(user._id));
    }
  }, [user, dispatch]);

  return (
    <>
      <Header />
      <div className="barber-home">
        {user.role && salons.length > 0 ? (
          <>
            <button>Check Schedules</button>
            <button>Update Salon</button>
          </>
        ) : (
          <>
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
