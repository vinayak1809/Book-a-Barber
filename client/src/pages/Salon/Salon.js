import React from "react";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificSalonDetails } from "../../features/Salons/salonsSlice";
import { getSpecificSalonServices } from "../../features/services/servicesSlice";

import "./Salon.css";

export const Salon = () => {
  const { salonName } = useParams();
  const dispatch = useDispatch();
  const { salons } = useSelector((state) => state.salons);
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getSpecificSalonDetails(salonName));
    dispatch(getSpecificSalonServices("64ac518a07b9a6fadf2d53fc"));
  }, [dispatch]);

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
          <h3>Services</h3>
          <ul>
            {services.map((link, index) => (
              <li>
                <div>
                  <img src={`/${link.image}`}></img>
                </div>
                <div className="service-info">
                  <h3>{link.name}</h3>
                  <p>{link.price}</p>
                </div>
                <button>Book a Appointment</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};
