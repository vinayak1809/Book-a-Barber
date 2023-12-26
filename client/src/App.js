import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import HomePage from "./pages/Home/HomePage";
import SignUpLogin from "./pages/Signup-login/signUp-Login";
import SalonsPage from "./pages/SalonsPage/SalonsPage";
import Salon from "./pages/Salon/Salon";
import NotFound from "./pages/Not-Found/NotFound";
import BarberHome from "./pages/Barber-Home/BarberHome";
import RegisterSalon from "./pages/Register-Salon/RegisterSalon";
import AddService from "./pages/Add-Service/AddService";
import DatePayment from "./pages/Date-Payment/DatePayment";
import Orders from "./pages/Orders/Orders";
import Schedules from "./pages/Schedules/Schedules";
import Profile from "./pages/Profile/Profile";

axios.defaults.withCredentials = true;

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user.role === "user" ? (
            <>
              <Route path="/" element={<Navigate to="/Salons" />} />
              <Route path={`/Salon/:username/:salonName`} element={<Salon />} />
              <Route path="/Salons" element={<SalonsPage />} />
              <Route
                path={`/Salon/:username/:salonName/select-date`}
                element={<DatePayment />}
              />
              <Route path="/Orders" element={<Schedules />} />
            </>
          ) : user.role === "barber" ? (
            <>
              <Route path="/" element={<BarberHome />} />
              <Route path="/Services" element={<AddService />} />
              <Route path={`/Salon/:username/:salonName`} element={<Salon />} />
              <Route path="/register-salon" element={<RegisterSalon />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/User" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path={`/Salon/:salonName`} element={<Salon />} />
              <Route path="/Salons" element={<SalonsPage />} />
            </>
          )}

          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="/Product" element={<NotFound />} />
          <Route path="/logout" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
