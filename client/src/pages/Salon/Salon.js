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

  const { salons } = useSelector((state) => state.salons);
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
    if (salons.length > 0) {
      dispatch(getSpecificSalonServices(salons[0]._id));
    }
  }, [dispatch, salons]);

  return (
    <>
      <main className="salonPage">
        <Header />
        <div className="salon-view">
          <div className="salon-view-img">
            <img src={`/${salons[0].logo}`} alt="" />
          </div>
          <div className="salon-view-description">
            <h3>{salons[0].name}</h3>
            <p className="p1">
              A26-28, Sector 110 Market, Shramik Kunj, Sector 110, Noida, Uttar
              Pradesh 201304, India
            </p>
            <div className="dash"></div>
            <p className="p2"> Mon-Sun | 10:00 am - 8:00 pm </p>
          </div>
        </div>
        <div className="salon-services">
          <Services salonName={salons[0].name} services={services} />
        </div>
      </main>
    </>
  );
};

export default Salon;
