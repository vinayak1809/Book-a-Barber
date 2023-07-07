
import LeftSideSignUp from "../../components/signup-login/left-signup";
import RightSideSignUp from "../../components/signup-login/right-signup";
import "./signUp-Login.css";

const SignUpLogin = () => {
  return (
    <div className="signup-login-parent">
      <LeftSideSignUp />
      <RightSideSignUp />
    </div>
  );
};

export default SignUpLogin;
