import React, { useEffect, useState } from 'react'
import './DateCarousel.css';
import MyCard from './MyCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSalonSchedules } from '../../features/Salons/salonsSlice';

const DateCarousel = (props) => {
  const [count,setCount] = useState(0);
  const [currentDate,setCurrentDate] = useState();
  const [dateTime,setDateTime] = useState([]);

  const dispatch = useDispatch()

  const { schedules } = useSelector((state) => state.salons);
  
  useEffect(()=>{
    dispatch(getAllSalonSchedules(props.service.salonID._id))

    setDateTime(schedules[0].dayTime)
  },[dateTime])

  const btnPrev = (event) => { 
    event.preventDefault();
    const box = document.querySelector('.date-container');
    box.scrollLeft -=300;
    
    if (count > 0){
      setCount(count - 1)
      setCurrentDate(dateTime[count-1].date)
    } 
  }

  const btnNext = (event) => {
    event.preventDefault();
    const box = document.querySelector('.date-container');
    box.scrollLeft += 270;
    
    if(count < (dateTime.length - 1)){
      setCount(count + 1)
      setCurrentDate(dateTime[count + 1].date)
    }
  }

  return (
    <div className='date-carousel'>

        <button className='pre-btn' onClick={btnPrev}><p>&lt;</p></button>
        <button className='next-btn' onClick={btnNext}><p>&gt;</p></button>
    
        <div className='date-container'>
        {dateTime.map((link,index)=>(
             <MyCard date={link.date} currDate={currentDate} count={dateTime[count].date} cardNo={index} time={link.time} />
        ))}
        </div>
    </div>
  )
}

export default DateCarousel