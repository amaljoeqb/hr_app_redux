import { Navigate, RouteObject } from "react-router-dom";
import EmployeeDetail from "../pages/EmployeeDetail/EmployeeDetail";
import { EmployeeListing } from "../pages/EmployeeListing/EmployeeListing";
import ErrorPage from "../pages/Error/ErrorScreen";
import Login from "../pages/Login/LoginPage";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import LoginLayout from "../layout/LoginLayout/LoginLayout";

const routesConfig: RouteObject[] = [
  {
    element: <LoginLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeListing />,
      },
      {
        path: "/employee/",
        element: <EmployeeDetail />,
      },

      {
        path: "/employee/:employeeId",
        element: <EmployeeDetail />,
      },
      {
        path: "/404",
        element: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/login" replace /> },
];

export default routesConfig;
