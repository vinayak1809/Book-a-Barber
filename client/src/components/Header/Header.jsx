import "./Header.css";
import { getSpecificSalonDetails_ID } from "../../features/Salons/salonsSlice";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const [links, setLinks] = useState([]);
  const [sideBar,setSideBar] = useState(false);

  const { currentSalon } = useSelector((state) => state.salons);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if(user.role === "Barber"){
      dispatch(getSpecificSalonDetails_ID(user._id));
      setLinks([])
    }
  }, [user, dispatch]);
  


  useEffect(() => {
    if (user.role === "user") {
      setLinks([
        { name: "Notification", path: "/Notification" },
        { name: "Profile", path: "/Profile" },
        { name: "Appointments", path: "/Orders" },
        { name: "Logout", path: "/logout",on:() => {
          dispatch(logout())
          navigate('/')
        }},
      ]);
    } else if (user.role === "barber") {
      setLinks([
        ...(currentSalon.length > 0
          ? [{ name: "Salon", path: `/Salon/${user.fullname}/${currentSalon[0].name}` }]
          : [{ name: "Register", path: `/register-salon` }]),
          //{ name: "Services", path: "/Services" }
        { name: "user", path: "/User" },
        { name: "Schedules", path: "/Schedules" },
        { name: "Logout", path: "/logout",on:() => {
          dispatch(logout())
          navigate('/')
        }},
      ]);
    }
  }, [user, currentSalon,dispatch,navigate]);
  
  const handleToggle = () => {
    setSideBar(!sideBar);
  };

  return (
  <>
    <nav className="navbar">
      <div className="logo">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h3>SNIPSNAP</h3>
      </Link>
      </div>
      <div className="profile">
        {user.role !== "" ?
        <span onClick={handleToggle} className="material-symbols-outlined">
          account_circle
        </span>
        :
        <Link to="/Signup" style={{ textDecoration: 'none' }}>
          <h3>Login</h3>
        </Link>
        }
      </div>
    </nav>

    {sideBar &&
      <div className="sidebar">
        <ul>
        {links.map((link,index) => (
                <Link key={index} to={link.path} onClick={link.on}>
                  <li>{link.name}</li>
                </Link>
          ))}
          <span onClick={handleToggle} className="material-symbols-outlined">close</span>
        </ul>
      </div>
    }
  </>
  );
};

export default Header;