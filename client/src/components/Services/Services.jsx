import "./Services.css";
import { setChoosedService } from '../../features/services/servicesSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Services = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services,salonName }= props;
  const { user } = useSelector((state) => state.user);

  const redirectTo = async (service,tagname) => {
    const action = {
      service:service,
      tagname:tagname
    }
   dispatch(setChoosedService(action))
   
   await new Promise((resolve) => setTimeout(resolve, 100));

   user.role === "user" ? navigate(`/Salon/${user.fullname}/${salonName}/select-date`)
   :
   navigate("/signup")
}
    
  return (
    <>
      <div className='top3'>
          <h3>Services</h3>
          <ul>
         {services && services.map((link, index) => (

            <li className="tag" key={index}>
              <h3>{link.tag}</h3>
              <div className="tag-list">

                    {link.types.map((link2,index)=>(
                      <div className="tagname">
                        <p>{link2.name}</p>
                        {
                        user.role !== "barber" &&
                        <div className='service-book-btn'>
                            <button onClick={()=>redirectTo(link,link2.name)}>Book</button>
                        </div>
                        }
                      </div>
                    ))}

              </div>
            </li>
         
          ))}
          

          </ul>
      </div>
    </>
  )
}

export default Services;