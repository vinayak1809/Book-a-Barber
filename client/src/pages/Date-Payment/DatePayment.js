import "./DatePayment.css";
import DateCarousel from "../../components/Date-Carousel/DateCarousel";

import { Navigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DatePayment = () => {
  const { salonName } = useParams();
  const { state } = useLocation();
  const { user } = useSelector((state) => state);

  return (
    <>
      {user.role === "" && <Navigate to="/signup" replace={true}></Navigate>}

      <main className="date-payment">
        <div className="service-side">
          <div className="h1">
            <h1>{salonName}</h1>
          </div>
          <div className="order-list">
            <div className="img-order">
              <img src={`/${state.service.image}`} alt="not found"></img>
            </div>
            <div className="name-price">
              <h6>{state.service.name}</h6>
              <p>{state.service.price}₹</p>
            </div>
          </div>
          {/* <div className="second">
              <p>{service.price}</p>
            </div>*/}
        </div>
        <div className="date-side">
          <form>
            <div className="wrapper">
              <DateCarousel service={state.service} />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default DatePayment;
