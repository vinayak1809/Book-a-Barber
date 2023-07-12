
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {

  const links = [
    {name: "About",path:"/About"},
    {name: "Product",path:"/Product"},
    {name: "Salons",path:"/Salons"},
    {name: "Blog",path:"/Blog"},
    {name: "Login",path:"/signup"}
  ];

  return (
    <nav className="nav-desktop" id="navbar">
      <div className="navbarLeftSide-parent" id="navbarLeftSide">
        <img
          className="icon"
          alt=""
          src="/icon.png"
        />
        <b className="bookabarber">BookaBarber</b>
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
