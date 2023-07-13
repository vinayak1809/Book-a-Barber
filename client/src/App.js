import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignUpLogin from "./pages/Signup-login/signUp-Login";
import { SalonsPage } from "./pages/SalonsPage/SalonsPage";
import { Salon } from "./pages/Salon/Salon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/salons" element={<SalonsPage />} />
          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="/salons/:salonName/:salonID" element={<Salon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
