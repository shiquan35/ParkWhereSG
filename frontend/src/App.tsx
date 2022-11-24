import { AuthProvider } from "./components/firebaseContext/FirebaseContext";
import { Routes, Route } from "react-router-dom";
import Map from "./components/pages/Map";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import { ForgotPassword } from "./components/authentication/ForgotPassword";
import Avail from "./components/Lta";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Avail />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/passwordReset" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
