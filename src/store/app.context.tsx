import { createContext, useContext, useReducer } from "react";
import { Department, Employee, IToast, Skill } from "../models";
import { IShowToast, useToast } from "../hooks/";

export interface AppState {}

export interface AppContextType {
  state: AppState;
  dispatch: any;
  toasts: IToast[];
  showToast: (params: IShowToast) => void;
  closeToast: (id: number) => void;
}

// Initial state for your app
const initialState: AppState = {};

// Reducer function to manage state changes
const appReducer = (
  state: AppState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Create a context
const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
  toasts: [],
  showToast: () => null,
  closeToast: () => null,
} as AppContextType);

export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { toasts, showToast, closeToast } = useToast();

  return (
    <AppContext.Provider
      value={{ state, dispatch, toasts, showToast, closeToast }}
    >
      {children}
    </AppContext.Provider>
  );
};
