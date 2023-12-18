import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { useSelector, useDispatch } from "react-redux";
import { default as employeesReducer } from "./slices/employees.slice";
import { default as prevEmployeesReducer } from "./slices/prevEmployees.slice";
import { default as staticDataReducer } from "./slices/staticData.slice";
import { default as toastsReducer } from "./slices/toasts.slice";
import { thunk } from "redux-thunk";

export const rootReducer = combineReducers({
  employees: employeesReducer,
  staticData: staticDataReducer,
  prevEmployees: prevEmployeesReducer,
  toasts: toastsReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);

export type State = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;

export const useAppSelector = <T>(selector: (state: State) => T) => {
  return useSelector(selector);
};

export const useAppDispatch = () => {
  return useDispatch<Dispatch>();
};
