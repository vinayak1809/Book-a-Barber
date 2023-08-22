import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";
import "./MyCard.css"


const MyCard = (props) => {

  const [time,setTime]= useState("");

  const { user } = useSelector((state) => state.user);
  const { choosedService } = useSelector((state) => state.services);
 

  const createOrder = async (e) => {
    e.preventDefault();
    const appointmentDetails = {
      userId: user._id,
      barberId: choosedService.salonID._id,
      services: [{
        serviceID:choosedService._id,serviceName:choosedService.types[0].name
      }],
      time: time,
      date: props.count,
      status: false,
      totalAmount: 100,
    };


    const {
      data: { RZP_key },
    } = await axios.get("http://localhost:4000/api/getKey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/checkout", appointmentDetails);

    const options = {
      key: RZP_key,
      amount: order.amount,
      currency: "INR",
      name: "Book a Barber",
      description: "book a barber application",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:4000/payment-verification",
      prefill: {
        name: user.fullname, //whoever logins his credentials
        email: user.email,
        contact: "9000090000", //user.contactInformation
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var razor = new window.Razorpay(options);

    razor.open();
  };



  const handleTimeClick = (time) => {
    setTime(time);
  };

  const getTimeStyle = (t) => {
    if (time === t) {
      return {background: '#FFB700', color: 'black',border:"1px solid #d89c05" };
    }
    return {};
  };

  return (
    <div className='mycard'>
    <form>
      <div className='first-card'>
          <div className='date'>
          <h4>{props.date} </h4>
          </div>
          <div className='time'>
            
            <ul>

            {props.time.map((link,index)=>(
              <li 
              className="sub-time"
              style={getTimeStyle(props.time[index])} 
              onClick={() => handleTimeClick(props.time[index])}>
                {props.time[index]}
              </li>
            ))}
             
            </ul>
          </div>
          <div className='book-btn'>
            <button onClick={(e) => {
                  createOrder(e);
                }}
              >
                Book
              </button>
          </div>
      </div> 
    </form>
    </div>
  )
}

export default MyCard;
