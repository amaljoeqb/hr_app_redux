import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../pages/Login/hooks/useAuth";

const LoginLayout = () => {
  const { user } = useAuth();
  return <>{user.isAuth ? <Navigate to="/" replace={true} /> : <Outlet />}</>;
};

export default LoginLayout;
