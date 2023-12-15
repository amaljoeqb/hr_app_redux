import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./reducers/root.reducer";
import { Employee } from "../models";
import { employeesReducer } from "./reducers/employees.reducer";
import { prevEmployeesReducer } from "./reducers/prevEmployees.reducer";
import { staticDataReducer } from "./reducers/staticData.reducer";

export const store = createStore(rootReducer);
