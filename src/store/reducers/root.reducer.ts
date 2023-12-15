import { combineReducers } from "redux";
import { employeesReducer } from "./employees.reducer";
import { prevEmployeesReducer } from "./prevEmployees.reducer";
import { staticDataReducer } from "./staticData.reducer";

const rootReducer = combineReducers({
  employees: employeesReducer,
  staticData: staticDataReducer,
  prevEmployees: prevEmployeesReducer,
});
