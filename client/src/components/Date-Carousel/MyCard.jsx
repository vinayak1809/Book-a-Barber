import { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";

import "./MyCard.css"


const MyCard = (props) => {

  const [time,setTime]= useState("");
  const [date,setDate] = useState("");
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
     date: date,
     status: "requested",
     totalAmount: Number(choosedService.types[0].price),
   };

   
   const response = await axios.post("http://localhost:4000/checkout", appointmentDetails)
   response.status  ? alert("Appointment request sended to Barber") : alert("Something went wrong")
  
  };



  const handleTimeClick = (time,date) => {
    setTime(time.time);
    setDate(date);
  };

  const getTimeStyle = (t,d) => {
    if (time === t.time && props.currDate == d) {
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
              <p>{props.time[0].isBooked}</p>
              {props.time.map((link,index)=>(
                !link.isBooked && 
                <li key={index}
                className={`sub-time mycard-${props.cardNo}`}
                style={getTimeStyle(props.time[index],props.date)} 
                onClick={() => handleTimeClick(props.time[index],props.date)}>
                  {props.time[index].time}
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
