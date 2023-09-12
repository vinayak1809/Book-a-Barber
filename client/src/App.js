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

axios.defaults.withCredentials = true;

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        {user.role === "user" && <Navigate to="/Salons" />}
        <Routes>
          {user.role === "user" ? (
            <>
              <Route path={`/Salon/:username/:salonName`} element={<Salon />} />
              <Route path="/Salons" element={<SalonsPage />} />
              <Route
                path={`/Salon/:username/:salonName/select-date`}
                element={<DatePayment />}
              />
              <Route path="/logout" element={<Navigate to="/" />} />
              <Route path="/Orders" element={<Orders />}></Route>
            </>
          ) : user.role === "barber" ? (
            <>
              <Route path="/" element={<BarberHome />} />
              <Route path="/Services" element={<AddService />} />
              <Route path={`/Salon/:username/:salonName`} element={<Salon />} />
              <Route path="/register-salon" element={<RegisterSalon />}></Route>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
