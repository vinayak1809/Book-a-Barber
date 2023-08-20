import "./left-signup.css";
import { useState,useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useroptionLogin } from "../../features/user/optionSlice";

const LeftSideSignUp = () => {
  const dispatch = useDispatch();
  const [login,setLogin] = useState();
   
  const userOption = useSelector(state => state.userOption.login);
 
  useEffect(() => {
    setLogin(userOption);
  }, [userOption]);

  const changeOption = () =>{
    dispatch(useroptionLogin(!login))  
  }
  
  return (
    <div className="left-side">
      <section className="frame-parent" id="aside">
        <div className="bookabarber-parent" id="title">
          <div className="bookabarber">
            <span className="title">
              <span>Snip</span>
              <span className="barber">Snap</span>
            </span>
          </div>
          <div className="dash" />
          <div className="tagline">
            Your Style, Your Time, Your Barber.
          </div>
        </div>
        <div className="sign-in-wrapper">
          {login ? 
            <button onClick={()=>{ changeOption() }} className="sign-in">Register </button> :
            <button onClick={()=>{ changeOption() }} className="sign-in">Login</button>
          }
        </div>
      </section>
    </div>
  );
};

export default LeftSideSignUp;
