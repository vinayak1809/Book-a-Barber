import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import "./MyCard.css"
import { paymentVerification } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


const MyCard = (props) => {

  const [time,setTime]= useState("");
  
  const { user } = useSelector((state) => state.user);
  const { choosedService } = useSelector((state) => state.services);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const createOrder = async (e) => {

   e.preventDefault();
   const appointmentDetails = {
     userId: user._id,
     barberId: choosedService.salonID._id,
     services: [{
       serviceID:choosedService._id,serviceName:choosedService.types[0].name
     }],
     time: time,
     date: new Date(),
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
     handler: (response) => {
      dispatch(paymentVerification(response)); 

      navigate('/Orders')
    },
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



  const handleTimeClick = (time,datetete) => {
    setTime(time);
  };

  const getTimeStyle = (t,d) => {
    if (time === t && props.currDate==d) {
      return {background: '#FFB700', color: 'black',border:"1px solid #d89c05" };
    }
    return {};
  };

  return (
    <div className={`mycard mycard-${props.date}`}>
    <form>
      <div className='first-card'>
          <div className='date'>
          <h4>{props.date} </h4>
          </div>
          <div className='time'>
            
            <ul>
              {props.time.map((link,index)=>(
                <li key={index}
                className={`sub-time mycard-${props.cardNo}`}
                style={getTimeStyle(props.time[index],props.date)} 
                onClick={() => handleTimeClick(props.time[index],props.date)}>
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
