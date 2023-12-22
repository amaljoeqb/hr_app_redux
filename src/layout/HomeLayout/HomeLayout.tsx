import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <main className="container">
        {true ? <Outlet /> : <Navigate to={"/login"} replace={true} />}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
