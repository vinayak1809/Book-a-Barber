
import {Link} from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getSpecificSalonDetails_ID } from "../../features/Salons/salonsSlice";
import { useDispatch } from "react-redux";

const Header = () => {

  const { user } = useSelector((state) => state);
  const [links, setLinks] = useState([]);
  
  const { salons } = useSelector((state) => (state.salons));
  const dispatch = useDispatch();

  useEffect(() => {
    if(user.role === "Barber"){
      dispatch(getSpecificSalonDetails_ID(user._id));
      setLinks([])
    }
    }, [user, dispatch]);
  
  useEffect(() => {
    if(user.role === ""){
      setLinks([
        { name: "About", path: "/About" },
        { name: "Blog", path: "/Blog" },
        { name: "Salons", path: "/Salons" },
        { name: "Login", path: "/signup" },
      ])}
    else if (user.role === "user") {
      setLinks([
        { name: "Blog", path: "/Blog" },
        { name: "Salons", path: "/Salons" },
        { name: "user", path: "/User" },
      ]);
    } else if (user.role === "Barber") {
      setLinks([
        ...(salons.length > 0
          ? [{ name: "Salon", path: `/Salon/${user.fullname}/${salons[0].name}` },
              { name: "Services", path: "/Services" }]
          : []),
        { name: "user", path: "/User" },
        { name: "Schedules", path: "/Schedules" },
      ]);
    }
  }, [user.role, salons]);
  
  
  return (
    <nav className="nav-desktop" id="navbar">
      <div className="navbarLeftSide-parent" id="navbarLeftSide">
      
          <img
            className="icon"
            alt=""
            src="/icon.png"
          />
          <Link to="/">
            <b className="bookabarber">BookaBarber</b>
          </Link>
      </div>
      <div className="nav-items-parent">
        <div className="nav-items" id="navbarRightSide">
          <ul>
              {links.map((link,index) => (
                <Link key={index} to={link.path}>
                  <li>{link.name}</li>
                </Link>
              ))}
          </ul>
        </div>
        <div className="vector-wrapper">
          <img className="vector-icon" alt="" src="/vector.svg" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
