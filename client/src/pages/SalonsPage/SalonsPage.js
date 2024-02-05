import "./SalonsPage.css";
import Header from "../../components/Header/Header";
import { Salons } from "../../components/Salons/Salons";

import { getServicesForChossedCategory } from "../../features/services/servicesSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SalonsPage = () => {
  const dispatch = useDispatch();
  const [service, setService] = useState("");

  //useSelector second 3
  const { user } = useSelector((state) => state.user);
  const { services } = useSelector((state) => state.services);

  //useEffect second 2
  useEffect(() => {
    dispatch(getServicesForChossedCategory(service || "All"));
  }, [service, dispatch]);

  //return renders first 1
  return (
    <div className="top2">
      <Header />
      <div className="salons-page">
        <div className="category">
          <label className="choose-ser" htmlFor="services">
            Choose a Service :
          </label>
          <select
            name="services"
            id="services"
            onChange={(e) => setService(e.target.value)}
          >
            <option value="All">All</option>
            <option value="hair">Haircut</option>
            <option value="beard">Beard</option>
            <option value="facial">Facial</option>
            <option value="massage">Massage</option>
          </select>
        </div>
        <Salons user={user} salons={services} />
      </div>
    </div>
  );
};

export default SalonsPage;
