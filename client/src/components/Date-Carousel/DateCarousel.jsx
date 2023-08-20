import React, { useState } from 'react'
import './DateCarousel.css';
import MyCard from './MyCard';

const dates = [
  {
    date: "12 Sep",
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
    date: "13 Sep",
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
    date: "14 Sep",
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
    date: "15 Sep",
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
    date: "16 Sep",
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
    date: "17 Sep",
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
  let box = document.querySelector('.date-container');

  const [count,setCount] = useState(0);

  const btnPrev = (event) => { 
    event.preventDefault();
    box.scrollLeft -=300;
    setCount(count-1);
  }

  const btnNext = (event) => {
    event.preventDefault();
    box.scrollLeft += 270;
    setCount(count+1)
  }

  return (
    <div className='date-carousel'>

        <button className='pre-btn' onClick={btnPrev}><p>&lt;</p></button>
        <button className='next-btn' onClick={btnNext}><p>&gt;</p></button>
    
        <div className='date-container'>
        {dates.map((link,index)=>(
             <MyCard date={link.date} count={dates[count].date} time={link.time}/>
        ))}
        </div>
    </div>
  )
}

export default DateCarousel