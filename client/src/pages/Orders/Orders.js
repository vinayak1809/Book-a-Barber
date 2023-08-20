import "./Orders.css";

import Header from "../../components/Header/Header";

const Orders = () => {
  return (
    <div className="top4">
      <Header></Header>
      <div className="orders-page">
        <div className="upcoming-orders">
          <h2>Upcoming</h2>
          <div className="up-order">
            <h4>August 25,2011</h4>
            <p>Haircut</p>
          </div>
          <div className="up-order">
            <h4>August 25,2011</h4>
            <p>Beard</p>
          </div>
        </div>
        <div className="completed-orders">
          <h2>Completed</h2>
          <div className="cp-order">
            <h4>July 26,2011</h4>
            <p>Beard</p>
          </div>
          <div className="cp-order">
            <h4>May 12,2011</h4>
            <p>Haircut</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
