import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Salons } from "../../components/Salons/Salons";
import "./SalonsPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSalonsDetails,
  getSalonsForChosedService,
} from "../../features/Salons/salonsSlice";

export const SalonsPage = () => {
  const dispatch = useDispatch();
  const [service, setService] = useState("");
  const { user } = useSelector((state) => state);
  const { salons } = useSelector((state) => state.salons);

  useEffect(() => {
    if (service == "All" || service == "") {
      dispatch(getAllSalonsDetails());
    } else {
      dispatch(getSalonsForChosedService(service));
    }
  }, [service]);

  return (
    <>
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
        <Salons user={user} salons={salons} />
      </div>
    </>
  );
};
