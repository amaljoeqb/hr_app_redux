import { Navigate, Outlet } from "react-router-dom";

const LoginLayout = () => {
  return <>{true ? <Navigate to="/" replace={true} /> : <Outlet />}</>;
};

export default LoginLayout;
