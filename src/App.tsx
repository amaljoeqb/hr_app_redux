import "./css/buttons.css";
import "./css/normalize.css";
import "./css/popup.css";
import "./css/style.css";
import "./css/input.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./config";
import useLoadData from "./hooks/useLoadData";
import ToastContainer from "./components/ui/Toast/ToastContainer";
import { Loader } from "./components";
import { useAppDispatch, useAppSelector } from "./store/store";
import { removeToast } from "./store/slices/toasts.slice";

const basename = "/";

const router = createBrowserRouter(routes, {
  basename,
});

function App() {
  const loading = useLoadData();
  const toasts = useAppSelector((state) => state.toasts);
  const dispatch = useAppDispatch();
  const closeToast = (id: number) => {
    dispatch(removeToast(id));
  };

  return (
    <div className="App">
      {loading ? (
        <Loader className="fullscreen" />
      ) : (
        <RouterProvider router={router} />
      )}
      <ToastContainer toasts={toasts} onCloseToast={closeToast} />
    </div>
  );
}

export default App;
