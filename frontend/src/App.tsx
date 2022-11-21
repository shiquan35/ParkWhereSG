import LtaCall from "./components/apiCall/LtaCall";
import { ForgotPassword } from "./components/authentication/ForgotPassword";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import SignUp from "./components/authentication/SignUp";
import { AuthProvider } from "./components/firebaseContext/FirebaseContext";

function App() {
  return (
    <>
      <AuthProvider>
        <div>Hello</div>
        {/* <LtaCall /> */}
        <Login />
        <SignUp />
        <Logout />
        <ForgotPassword />
      </AuthProvider>
    </>
  );
}

export default App;
