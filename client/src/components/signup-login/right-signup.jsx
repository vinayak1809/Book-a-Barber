import "./right-signup.css";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useroptionLogin } from "../../features/user/optionSlice";
import { createUser,checkLoginDetails } from "../../features/user/userSlice";
import {  Navigate,useNavigate } from 'react-router-dom';

const RightSideSignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  //option logic
  const [loginSignup,setLoginSignup] = useState(); 
  
  const userOption = useSelector(state => state.userOption.login);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setLoginSignup(userOption);
  }, [userOption]);

  const changeOption = () =>{
      dispatch(useroptionLogin(!loginSignup))  
    }
 
    //register logic

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("");
    
    const pushData = (e) =>{
      e.preventDefault();
      const userDetails = {
        fullname:name,
        email:email,
        password:password,
        role:role 
      }

      if (!loginSignup){
        dispatch(createUser(userDetails));
      }else{
        dispatch(checkLoginDetails(userDetails));
        if(user.role === "user"){
          navigate("/Salons")
        }else{
          navigate("/")
        }
      }
    }
    
  return (
<>
    {user && <Navigate to="/" replace={true}></Navigate>}
    <div className="signup-login">
      <div className="heading">
        Begin your journey with
        <br />
        <span>us!</span>
      </div>
      <form  action="" onSubmit={(e)=>pushData(e)}>
        <div className="textarea">
          <ul>
          {!loginSignup && 
            <input
            type="text" name="name" id="name" 
            placeholder={"Name :"} required
            onChange={(e) => setName(e.target.value)}
            ></input>

          }
            <input type="email" name="email" id="email" required placeholder={"Email :"}
            onChange={(e) => setEmail(e.target.value)}>
            </input>
            
            <input type="password" required name="password" id="password" placeholder={"Password :"}
            onChange={(e) => setPassword(e.target.value)}>
            </input>

          </ul>
          {!loginSignup && 
          <div className="role">
            <label name="">Role:</label>
            <div className="role-options">

              <div className="role-option">
                <input type="radio" name="role" required onChange = {(e) => setRole(e.target.value)} value="Barber"/>
                <label name="">Barber</label>
              </div>

              <div className="role-option">
                <input type="radio" name="role" required onChange = {(e) => setRole(e.target.value)} value="user"/>
                <label name="">User</label>
              </div>
              
            </div>
          </div>}
        </div>

        {loginSignup ?
        <>
          <button className="signup-btn" type="submit">Sign In</button>
          <div className="already-acc">
            <div onClick={()=>{ changeOption() }} >Register?</div>
          </div>
        </> :
        <>
          <button className="signup-btn" type="submit">Sign Up</button>
          <div className="already-acc">
            <div onClick={()=>{ changeOption() }} >login?</div>
          </div>
        </>
        }
      </form>
    </div>
    </>
  );

};

export default RightSideSignUp;
