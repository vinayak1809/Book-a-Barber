import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Services = (Services) => {
  const { services,salonName }= Services;
  const navigate = useNavigate();

  const { user } = useSelector((state) => state);

  const redirectTo = (service) => {
    navigate(`/Salon/${user.fullname}/${salonName}/select-date`, {state:{service:service}})
}
    
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
                <button onClick={()=>redirectTo(link)}>Book an Appointment</button>

            </li>
        ))}
        </ul>
    </>
  )
}

export default Services