import { AuthProvider } from "./components/firebaseContext/FirebaseContext";
import { Routes, Route } from "react-router-dom";
import Map from "./components/pages/Map";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import { ForgotPassword } from "./components/authentication/ForgotPassword";
import Avail from "./components/pages/Lta";
import Dashboard from "./components/pages/Dashboard";
import Logout from "./components/authentication/Logout";
import DoesNotExist from "./components/pages/DoesNotExist";
import Layout from "./components/sidebar/Layout";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Avail />
              </Layout>
            }
          />
          <Route path="*" element={<DoesNotExist />} />
          <Route
            path="/map"
            element={
              <Layout>
                <Map />
              </Layout>
            }
          />
          <Route
            path="/list"
            element={
              <Layout>
                <Avail />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={
              <Layout>
                <Logout />
              </Layout>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/passwordReset"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
