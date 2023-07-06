import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignUpLogin from "./pages/Signup-login/signUp-Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
