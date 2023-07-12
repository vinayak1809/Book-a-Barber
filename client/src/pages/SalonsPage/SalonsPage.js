import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Salons } from "../../components/Salons/Salons";
import "./SalonsPage.css";

export const SalonsPage = () => {
  const [service, setService] = useState("");

  useEffect(() => {
    //load service
    // console.log(service);
  }, [service]);

  return (
    <>
      <Header />
      <div className="salons-page">
        <div className="category">
          <label htmlFor="cars">Choose a Service :</label>
          <select name="cars" id="cars">
            <option
              onChange={(e) => setService(e.target.value)}
              value="Haircut"
            >
              Haircut
            </option>
            <option onChange={(e) => setService(e.target.value)} value="Beard">
              Beard
            </option>
            <option onChange={(e) => setService(e.target.value)} value="Facial">
              Facial
            </option>
            <option
              onChange={(e) => setService(e.target.value)}
              value="Massage"
            >
              Massage
            </option>
          </select>
        </div>
        <Salons />
      </div>
    </>
  );
};
