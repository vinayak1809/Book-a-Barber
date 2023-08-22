import "./SalonsPage.css";
import Header from "../../components/Header/Header";
import { Salons } from "../../components/Salons/Salons";
import { getAllSalonsDetails } from "../../features/Salons/salonsSlice";

import { getServicesForChossedCategory } from "../../features/services/servicesSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SalonsPage = () => {
  const dispatch = useDispatch();
  const [service, setService] = useState("");

  const { user } = useSelector((state) => state.user);
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServicesForChossedCategory(service || "All"));
  }, [service, dispatch]);

  return (
    <div className="top2">
      <Header />
      <div className="salons-page">
        <div className="category">
          <label htmlFor="services">Choose a Service :</label>
          <select
            name="services"
            id="services"
            onChange={(e) => setService(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Haircut">Haircut</option>
            <option value="Beard">Beard</option>
            <option value="Facial">Facial</option>
            <option value="Massage">Massage</option>
          </select>
        </div>
        <Salons user={user} salons={services} />
      </div>
    </div>
  );
};

export default SalonsPage;
