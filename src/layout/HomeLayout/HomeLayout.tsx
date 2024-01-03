import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import useAuth from "../../pages/Login/hooks/useAuth";

const HomeLayout = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      <main className="container">
        {user.isAuth ? <Outlet /> : <Navigate to={"/login"} replace={true} />}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
