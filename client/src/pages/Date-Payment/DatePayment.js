import { useLocation, useParams } from "react-router-dom";
import "./DatePayment.css";

export const DatePayment = () => {
  const { salonName } = useParams();
  const { state } = useLocation();
  const { service } = state;

  return (
    <>
      <main className="date-payment">
        <div className="service-side">
          <div className="first">
            <h1>{salonName}</h1>
            <img src={`/${service.image}`} alt="not found"></img>
            <p>
              {service.name} <span>{service.price} </span>
            </p>
          </div>
          <div className="second">
            <p>{service.price}</p>
          </div>
        </div>
        <div className="date-side"></div>
      </main>
    </>
  );
};
