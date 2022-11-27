import { Navigate } from "react-router-dom";
import { useAuth } from "./components/firebaseContext/FirebaseContext";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute(props: PrivateRouteProps) {
  const { user } = useAuth();

  return user ? props.children : <Navigate to="/" />;
}
