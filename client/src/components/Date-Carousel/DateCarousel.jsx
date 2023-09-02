import React, { useEffect, useState } from 'react'
import './DateCarousel.css';
import MyCard from './MyCard';

const dates = [
  {
    date: "12-09-2023",
    time: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]},{
    date: "13-09-2023",
    time: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]},{
    date: "14-09-2023",
    time: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]},{
    date: "15-09-2023",
    time: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]},{
    date: "16-09-2023",
    time: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]},{
    date: "17-09-2023",
    time: [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ]},
  
];

const DateCarousel = (props) => {
  const [count,setCount] = useState(0);
  const [date,setDate] = useState(dates[0].date);

  const btnPrev = (event) => { 
    event.preventDefault();
    const box = document.querySelector('.date-container');
    box.scrollLeft -=300;
    
    if (count > 0){
      setCount(count - 1)
      setDate(dates[count-1].date)
    } 
  }

  const btnNext = (event) => {
    event.preventDefault();
    const box = document.querySelector('.date-container');
    box.scrollLeft += 270;
    
    if(count < dates.length){
      setCount(count+1)
      setDate(dates[count+1].date)
    }
  }

  return (
    <div className='date-carousel'>

        <button className='pre-btn' onClick={btnPrev}><p>&lt;</p></button>
        <button className='next-btn' onClick={btnNext}><p>&gt;</p></button>
    
        <div className='date-container'>
        {dates.map((link,index)=>(
             <MyCard date={link.date} currDate={date} count={dates[count].date} cardNo={index} time={link.time}/>
        ))}
        </div>
    </div>
  )
}

export default DateCarousel