import { createContext, useContext, useReducer } from "react";
import { Department, Employee, IToast, Skill } from "../models";
import { IShowToast, useToast } from "../hooks/";

export interface AppState {
  employees: Employee[];
  skills: Skill[];
  departments: Department[];
  prevEmployees: Map<string, Partial<Employee>>;
}

export interface AppContextType {
  state: AppState;
  dispatch: any;
  toasts: IToast[];
  showToast: (params: IShowToast) => void;
  closeToast: (id: number) => void;
}

// Initial state for your app
const initialState: AppState = {
  employees: [],
  skills: [],
  departments: [],
  prevEmployees: new Map(),
};

// Reducer function to manage state changes
const appReducer = (
  state: AppState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "SET_EMPLOYEES": {
      return { ...state, employees: action.payload };
    }
    case "SET_SKILLS": {
      return { ...state, skills: action.payload };
    }
    case "SET_DEPARTMENTS": {
      return { ...state, departments: action.payload };
    }
    case "ADD_EMPLOYEE": {
      const employees = [...state.employees, action.payload];
      return { ...state, employees };
    }
    case "UPDATE_EMPLOYEE": {
      const employees = state.employees.map((employee) => {
        if (employee.employeeId === action.payload.employeeId) {
          return action.payload;
        }
        return employee;
      });
      return {
        ...state,
        employees,
      };
    }
    case "UPDATE_EMPLOYEE_ID": {
      const employees = state.employees.map((employee) => {
        if (employee.employeeId === action.payload.oldId) {
          return { ...employee, employeeId: action.payload.newId };
        }
        return employee;
      });
      return {
        ...state,
        employees,
      };
    }
    case "SET_EMPLOYEE": {
      let exists = false;
      const employees = state.employees.map((employee) => {
        if (employee.employeeId === action.payload.employeeId) {
          exists = true;
          return action.payload;
        }
        return employee;
      });
      if (!exists) {
        employees.push(action.payload);
      }
      localStorage.setItem("employees", JSON.stringify(employees));
      return {
        ...state,
        employees,
      };
    }
    case "DELETE_EMPLOYEE": {
      const employees = state.employees.filter(
        (employee) => employee.employeeId !== action.payload
      );
      localStorage.setItem("employees", JSON.stringify(employees));
      return {
        ...state,
        employees,
      };
    }
    case "ADD_SKILL": {
      const skills = [...state.skills, action.payload];
      localStorage.setItem("skills", JSON.stringify(skills));
      return { ...state, skills };
    }
    case "SET_PREV_EMPLOYEE": {
      const prevEmployees = new Map(state.prevEmployees);
      prevEmployees.set(action.payload.id, action.payload.employee);
      return { ...state, prevEmployees };
    }
    case "DELETE_PREV_EMPLOYEE": {
      const prevEmployees = new Map(state.prevEmployees);
      if (prevEmployees.get(action.payload.id) === action.payload.employee) {
        prevEmployees.delete(action.payload.id);
      }
      return { ...state, prevEmployees };
    }
    default: {
      return state;
    }
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
