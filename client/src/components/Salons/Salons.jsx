
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
            <Link style={{ textDecoration: 'none'}} key={index} to={user._id ? `/Salon/${user.fullname}/${link.name}` :`/Salon/${link.name}`}  state={{ salonID: link._id}} >
                <li key={index}>
                    <div className="img-section">
                        <img src={link.logo} alt="" />
                    </div>
                    <div className="salon-name">
                        <p>{link.name}</p>
                        <p>$100</p>
                    </div>
                    <div className="service-name">
                      <p>Haircut</p>
                    </div>
                    <div className="salon-description">
                        <p>{link.location}</p>
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