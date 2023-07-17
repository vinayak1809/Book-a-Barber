import { Link } from "react-router-dom";
import "./Salons.css";


export const Salons = (props) => {
  const { salons,user } = props;
 
  return (

    <div className="salons">
        <ul>
        {
          salons.map((link,index) => (
            <Link key={index} to={user._id ? `/Salon/${user.fullname}/${link.name}` :`/Salon/${link.name}`}  state={{ salonID: link._id}} >
                <li key={index}>
                    <div className="img-section">
                        <img src={link.logo} alt="" />
                    </div>
                    <div className="salon-name">
                        <h3>{link.name}</h3>
                    </div>
                    <div className="salon-description">
                        <p>{link.bio}</p>
                    </div>
                </li>
            </Link> 

           ))          
        }
        </ul>
    </div>
  )
}