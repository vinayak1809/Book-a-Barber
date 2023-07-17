import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignUpLogin from "./pages/Signup-login/signUp-Login";
import { SalonsPage } from "./pages/SalonsPage/SalonsPage";
import { Salon } from "./pages/Salon/Salon";
import { NotFound } from "./pages/Not-Found/NotFound";
import BarberHome from "./pages/Barber-Home/BarberHome";
import { useSelector } from "react-redux";
import RegisterSalon from "./pages/Register-Salon/RegisterSalon";
import AddService from "./pages/Add-Service/AddService";

function App() {
  const { user } = useSelector((state) => state);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user.role === "" ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path={`/Salon/:salonName`} element={<Salon />} />
              <Route path="/Salons" element={<SalonsPage />} />
            </>
          ) : user.role === "user" ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path={`/Salon/:username/:salonName`} element={<Salon />} />
              <Route path="/Salons" element={<SalonsPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<BarberHome />} />
              <Route path="/Services" element={<AddService />} />
              <Route path={`/Salon/:username/:salonName`} element={<Salon />} />
              <Route path="/register-salon" element={<RegisterSalon />}></Route>
            </>
          )}

          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="/Blog" element={<NotFound />} />
          <Route path="/About" element={<NotFound />} />
          <Route path="/Product" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
