import "./DatePayment.css";
import DateCarousel from "../../components/Date-Carousel/DateCarousel";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DatePayment = () => {
  const { user } = useSelector((state) => state);
  const { choosedService } = useSelector((state) => state.services);

  return (
    <>
      {user.role === "" && <Navigate to="/signup" replace={true}></Navigate>}

      <main className="date-payment">
        <div className="service-side">
          <div className="h1">
            <h1>{choosedService.salonID.name}</h1>
          </div>
          <div className="order-list">
            <div className="img-order">
              <p>{choosedService.tag}</p>
            </div>
            <div className="name-price">
              <h6>{choosedService.types[0].name}</h6>
              <p>{choosedService.types[0].price}₹</p>
            </div>
          </div>
          {/* <div className="second">
              <p>{service.price}</p>
            </div>*/}
        </div>
        <div className="date-side">
          <form>
            <div className="wrapper">
              <DateCarousel service={choosedService} />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default DatePayment;
