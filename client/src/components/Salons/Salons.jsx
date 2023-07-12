import { Link } from "react-router-dom";
import "./Salons.css";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllSalonsDetails } from "../../features/Salons/salonsSlice";

export const Salons = () => {
    const dispatch = useDispatch();
    const { salons } = useSelector(state => state.salons);

    useEffect(()=>{
       dispatch(getAllSalonsDetails())
    },[dispatch])

  return (
    <div className="salons">
        <ul>
        {
           salons.map((link,index) => (
                    
            <Link key={index} to={`${link.name}`}>
                <li>
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

const info = [
    {img:"salon-1.png",title:"The salon Family",description:"The Salon Family, is a team of skilled and professionals people, dedicated towards providing exceptional beauty and grooming services"},
    {img:"salon-2.png",title:"Adi's Salon",description:"The Salon Family, is a team of skilled and professionals people, dedicated towards providing exceptional beauty and grooming services"},
    {img:"salon-3.png",title:"Three Star Salon",description:"The Salon Family, is a team of skilled and professionals people, dedicated towards providing exceptional beauty and grooming services"}, {img:"salon-3.png",title:"Four Star Salon",description:"The Salon Family, is a team of skilled and professionals people, dedicated towards providing exceptional beauty and grooming services"}
]