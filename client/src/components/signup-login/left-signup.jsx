import "./left-signup.css";
import { useState } from "react";

const LeftSide = () => {
  const [login,setLogin] = useState(true); 

  return (
    <div className="left-side">
      <section className="frame-parent" id="aside">
        <div className="bookabarber-parent" id="title">
          <div className="bookabarber">
            <span className="bookabarber-txt">
              <span>Booka</span>
              <span className="barber">barber</span>
            </span>
          </div>
          <div className="frame-child" />
          <div className="your-style-your">
            Your Style, Your Time, Your Barber.
          </div>
        </div>
        <div className="sign-in-wrapper">
          {login ? 
            <button className="sign-in">Register </button> :
            <button className="sign-in">Sign In</button>
          }
        </div>
      </section>
    </div>
  );
};

export default LeftSide;
