import {
  UnknownAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { useSelector, useDispatch } from "react-redux";
import { default as employeesReducer } from "./slices/employees.slice";
import { default as prevEmployeesReducer } from "./slices/prevEmployees.slice";
import { default as staticDataReducer } from "./slices/staticData.slice";
import { default as toastsReducer } from "./slices/toasts.slice";
import { ThunkAction, thunk } from "redux-thunk";
import uiReducer from "./slices/ui.slice";
import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";

export const rootReducer = combineReducers({
  employees: employeesReducer,
  staticData: staticDataReducer,
  prevEmployees: prevEmployeesReducer,
  toasts: toastsReducer,
  ui: uiReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<any>> = ThunkAction<
  ReturnType,
  RootState,
  undefined,
  UnknownAction
>;

export const useAppSelector = <T>(selector: (state: RootState) => T) => {
  return useSelector(selector);
};

export const useAppDispatch = () => {
  return useDispatch<Dispatch>();
};
