import "./right-signup.css";
import { useState } from "react";

const RightSideSIgnUp = () => {
  const [login,setLogin] = useState(true); 

  return (
    <div className="signup-login">
      <div className="heading">
        Begin your journey with
        <br />
        <span>Book a Barber</span>
      </div>
      <div className="textarea">
        <ul>
          <input name="" id="" placeholder={"Name :"}></input>

          {!login && <input name="" id="" placeholder={"Email :"}></input>}
          
          <input name="" id="" placeholder={"Password :"}></input>
        </ul>
        <div className="role">
          <label name="">Role:</label>
          <div className="role-options">
            <div className="role-option-1">
              <input type="radio" name="role"/>
              <label name="">Barber</label>
            </div>
            <div className="role-option-2">
              <input type="radio" name="role"/>
              <label name="">User</label>
            </div>
          </div>
        </div>
      </div>

      {login ?
      <>
        <button type="submit">Sign In</button>
        <div className="already-acc">
          <a href="">Register ?</a>
        </div>
      </> :
      <>
        <button type="submit">Sign Up</button>
        <div className="already-acc">
          <a href="">Already have account ?</a>
        </div>
      </>
      }
    </div>
  );
};

export default RightSideSIgnUp;
