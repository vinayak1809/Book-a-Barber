import React from 'react'

const Services = (Services) => {
    const { services }= Services;
  return (
    <>
        <h3>Services</h3>
        <ul>
        {services.map((link, index) => (
            <li key={index}>
                <div>
                    <img src={`/${link.image}`}></img>
                </div>
                <div className="service-info">
                    <h3>{link.name}</h3>
                    <p>{link.price}</p>
                </div>
                <button>Book a Appointment</button>
            </li>
        ))}
        </ul>
    </>
  )
}

export default Services