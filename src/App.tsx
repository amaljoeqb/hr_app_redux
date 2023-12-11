import "./css/buttons.css";
import "./css/normalize.css";
import "./css/popup.css";
import "./css/style.css";
import "./css/input.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./config";
import useLoadData from "./hooks/useLoadData";
import { useAppContext } from "./store/app.context";
import ToastContainer from "./components/ui/Toast/ToastContainer";
import { Loader } from "./components";

const basename = "/hr_app_react";

const router = createBrowserRouter(routes, {
  basename,
});

function App() {
  const loading = useLoadData();
  const { toasts, closeToast } = useAppContext();

  return (
    <div className="App">
      {loading ? <Loader /> : <RouterProvider router={router} />}
      <ToastContainer toasts={toasts} onCloseToast={closeToast} />
    </div>
  );
}

export default App;
