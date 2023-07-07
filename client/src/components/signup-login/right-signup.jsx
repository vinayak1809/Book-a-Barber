import "./right-signup.css";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useroptionLogin } from "../../features/user/optionSlice";
import { createUser } from "../../features/user/userSlice";

const RightSideSignUp = () => {
  
  //option logic
  const [login,setLogin] = useState(); 
  const dispatch = useDispatch();

  const userOption = useSelector(state => state.userOption.login);
 
  useEffect(() => {
    setLogin(userOption);
  }, [userOption]);

  const changeOption = () =>{
      dispatch(useroptionLogin(!login))  
    }
 
    //register logic

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const pushData = (e) =>{
      e.preventDefault();
      const userDetails = {
        name:name,
        email:email,
        password:password
      }
     dispatch(createUser(userDetails));
    }
  return (
    <div className="signup-login">
      <div className="heading">
        Begin your journey with
        <br />
        <span>Book a Barber</span>
      </div>
      <form action="" onSubmit={(e)=>pushData(e)}>
        <div className="textarea">
          <ul>

            <input
            type="text" name="name" id="name" 
            placeholder={"Name :"}
            onChange={(e) => setName(e.target.value)}
            ></input>

            {!login && 
            <input type="email" name="email" id="email" placeholder={"Email :"}
            onChange={(e) => setEmail(e.target.value)}>
            </input>}
            
            <input type="password" name="password" id="password" placeholder={"Password :"}
            onChange={(e) => setPassword(e.target.value)}>
            </input>

          </ul>
          <div className="role">
            <label name="">Role:</label>
            <div className="role-options">

              <div className="role-option-1">
                <input type="radio" name="role" value="Barber"/>
                <label name="">Barber</label>
              </div>

              <div className="role-option-2">
                <input type="radio" name="role" value="user"/>
                <label name="">User</label>
              </div>
              
            </div>
          </div>
        </div>

        {login ?
        <>
          <button  type="submit">Sign In</button>
          <div className="already-acc">
            <div onClick={()=>{ changeOption() }} >Register ?</div>
          </div>
        </> :
        <>
          <button  type="submit">Sign Up</button>
          <div className="already-acc">
            <div onClick={()=>{ changeOption() }} >Already have account ?</div>
          </div>
        </>
        }
      </form>
    </div>
  );
};

export default RightSideSignUp;
