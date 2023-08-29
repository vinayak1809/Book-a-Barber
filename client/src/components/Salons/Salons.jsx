
import "./Salons.css";
import { Link } from "react-router-dom";

export const Salons = (props) => {
  const { salons,user } = props;
 
  return (
  <>
    <div className="all-salons">
        <ul>
        {
          salons.map((link,index) => (
            <Link style={{ textDecoration: 'none'}} key={index} to={user._id ? `/Salon/${user.fullname}/${link.salonID.name}` :`/Salon/${link.salonID.name}`}  state={{ salonID: link.salonID._id}} >
                <li key={link.toString()}>
                    <div className="img-section">
                        <img src={link.salonID.logo} alt="" />
                    </div>
                    <div className="salon-name">
                        <p>{link.salonID.name}</p>
                        <p>100-150&#8377;</p>
                    </div>
                    <div className="service-name">
                      <p>{link.tag}</p>
                    </div>
                    <div className="salon-description">
                        <p>{link.salonID.location}</p>
                    </div>
                </li>
            </Link> 

           ))          
        }
        </ul>
    </div>
    </>
  )
}