import Header from "../../components/Header/Header";
import HeroContainer from "../../components/Hero/Hero";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="nav-desktop-parent">
      <Header />
      <div className="hero-2">
        <div className="header-copy-parent">
          <div className="header-copy" id="HeaderCopy">
            <h1 className="book-an-appointment">
              Book an Appointment, On-the-go!
            </h1>
            <button className="button">Book your Appointment</button>
          </div>
          <div className="circle-bg-parent" id="showcase">
            <div className="circle-bg">
              <div className="ellipse" />
            </div>
            <img
              className="woman-hand-holding-iphone-12-m"
              alt=""
              src="/holding-phone.png"
            />
          </div>
          <div className="line" />
        </div>
      </div>
      <HeroContainer />
    </div>
  );
};

export default HomePage;
