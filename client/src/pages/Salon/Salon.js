import "./Salon.css";
import Header from "../../components/Header/Header";
import Services from "../../components/Services/Services";

import { getSpecificSalonDetails_SalonName } from "../../features/Salons/salonsSlice";
import { getSpecificSalonServices } from "../../features/services/servicesSlice";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Salon = () => {
  const dispatch = useDispatch();
  const { salonName } = useParams();

  const { user } = useSelector((state) => state.user);
  const { currentSalon } = useSelector((state) => state.salons);
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      await dispatch(getSpecificSalonDetails_SalonName(salonName));
    };

    if (salonName) {
      fetchSalonDetails();
    }
  }, [dispatch, salonName]);

  useEffect(() => {
    if (currentSalon.length > 0) {
      dispatch(getSpecificSalonServices(currentSalon[0]._id));
    }
  }, [dispatch, currentSalon]);

  return (
    <>
      <main className="salonPage">
        <Header />
        <div className="salon-view">
          <div className="salon-view-img">
            <img src={`${currentSalon[0].logo}`} alt="logo not supported" />
          </div>
          <div className="salon-view-description">
            <h3>{currentSalon[0].name}</h3>
            <p className="p1">{currentSalon[0].address}</p>
            <div className="dash"></div>
            <p className="p2">
              {currentSalon[0].Schedules | currentSalon[0].time}
            </p>
            {/*10:00 am - 8:00 pm*/}
          </div>
        </div>
        <div className="salon-services">
          <Services salonName={currentSalon[0].name} services={services} />
        </div>
      </main>
    </>
  );
};

export default Salon;
