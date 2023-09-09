import "./HomePage.css";
import { getAllSalonsDetails } from "../../features/Salons/salonsSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();

  const { salons } = useSelector((state) => state.salons);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSalonsDetails());
  }, [dispatch]);

  return (
    <>
      {user.role === "user" && (
        <Navigate to="/Salons" replace={true}></Navigate>
      )}

      <main className="main-homePage">
        {/* heading (title) */}
        <div className="head">
          <h1>SNIPSNAP</h1>
          <p>
            WELCOME TO SNIPSNAP, THE ULTIMATE BARBER APPOINTMENT BOOKING
            PLATFORM, GET READY TO TAME YOUR MANE AND FIND YOUR PERFECT BARBER
            MATCH!
          </p>
        </div>

        {/* head video */}
        <div className="video">
          <video muted autoPlay={"autoplay"} preload="auto" loop>
            <source src="/Videos/Fire-Barber-Shop.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* book Appointment*/}
        <div className="book-appointment">
          <h3>Get Started</h3>
          <p>
            Schedule your appointment in just few clicks, and let our skilled
            barbers handle the rest. Your new hairstyle awaits.
          </p>
          <div>
            <Link to="/Salons">
              <button>Book Appointment</button>
            </Link>
          </div>
        </div>

        {/* barber Signup*/}
        <div className="barber-signup">
          <h6>BARBER SIGNUP</h6>
          <p>
            Are you a talented barber looking to fill your appointment book?
            Join SnipSnap to showcase your skill set and grow your salon!
          </p>
          <div className="textarea">
            <input placeholder="rahul@gmail.com"></input>
            <Link to="/Signup">
              <button className="subscribe-btn">subscribe</button>
            </Link>
          </div>
        </div>

        {/* just a image */}
        <div className="image">
          <h6>Unleash your hair's potential.</h6>
        </div>

        {/* Salons */}
        <div className="homePage-salons">
          {salons.map((link, index) => (
            <Link style={{ textDecoration: "none" }} to={`/Salon/${link.name}`}>
              <div className="homePage-salon">
                <img src={link.logo} alt="not supported"></img>
                <h3> {link.name} </h3>
              </div>
            </Link>
          ))}
        </div>

        <span className="more-salons">
          <Link to="/Salons" className="more-link">
            <p className="more-text">+more</p>
          </Link>
        </span>

        {/* FAQ */}
        <div className="got-questions">
          <h3>Got Questions? We've got answers!</h3>
          <div className="questions">
            <div className="question">
              <h3>How do I book?</h3>
              <p>
                Simply browse our list of top barbers, choose your favorite and
                schedule a convenient appointment in just a few clicks!
              </p>
            </div>
            <div className="question">
              <h3>Can I reschedule?</h3>
              <p>
                Absolutely! You can reschedule your appointment up to 24 hours
                before the scheduled time.
              </p>
            </div>
            <div className="question">
              <h3>What's the cost?</h3>
              <p>
                The cost varies depending on the barber, salon, and services
                chosen. Rest assured, we provide competitive pricing to suit
                every budget.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
