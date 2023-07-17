import React from "react";
import Header from "../../components/Header/Header";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSalonDetails_SalonName } from "../../features/Salons/salonsSlice";
import { getSpecificSalonServices } from "../../features/services/servicesSlice";
import Services from "../../components/Services/Services";

import "./Salon.css";

export const Salon = () => {
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
      <Header />
      <main>
        <div className="salon-name">
          <h3>{salons[0].name}</h3>
        </div>
        <div className="img-section">
          <img src={`/${salons[0].logo}`} alt="" />
        </div>
        <div className="salon-description">
          <p>{salons[0].bio}</p>
        </div>
        <div className="services">
          <Services services={services} />
        </div>
      </main>
    </>
  );
};
