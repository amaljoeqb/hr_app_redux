import { RouteObject } from "react-router-dom";
import EmployeeDetail from "../pages/EmployeeDetail/EmployeeDetail";
import { EmployeeListing } from "../pages/EmployeeListing/EmployeeListing";
import ErrorPage from "../pages/Error/ErrorScreen";
import Login from "../pages/Login/LoginPage";

const routesConfig: RouteObject[] = [
  { path: "/", element: <EmployeeListing />, errorElement: <ErrorPage /> },
  { path: "/employee/:employeeId", element: <EmployeeDetail /> },
  { path: "/employee/", element: <EmployeeDetail /> },
  { path: "/404", element: <ErrorPage /> },
  { path: "/login", element: <Login /> },
];

export default routesConfig;
