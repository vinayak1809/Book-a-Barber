import "./Services.css";
import { setChoosedService } from '../../features/services/servicesSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Services = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services,salonName }= props;
  const { user } = useSelector((state) => state.user);

  const redirectTo = (service) => {
    dispatch(setChoosedService(service))
    
    user.role === "user" ? navigate(`/Salon/${user.fullname}/${salonName}/select-date`, {state:{service:service}})
    :
    navigate("/signup")
}
    
  return (
    <>
      <div className='top3'>
          <h3>Services</h3>
          <ul>
          {services.map((link, index) => (
              <li key={index}>
                  <div>
                      <img src={`/${link.image}`} alt="not supported"></img>
                  </div>
                  <div className="service-info">
                      <h1>{link.name}</h1>
                      <p>{link.price}</p>
                  </div>
                  <div className='service-book-btn'>
                    <button onClick={()=>redirectTo(link)}>Book</button>
                  </div>
              </li>
          ))}
          </ul>
      </div>
    </>
  )
}

export default Services;