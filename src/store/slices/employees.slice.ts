import { Action, Employee, FetchDataProps } from "../../models";
import * as API from "../../api";
import { showToast } from "./toasts.slice";
import { errorMessages } from "../../services";
import { Dispatch, State } from "../store";
import { ThunkAction } from "redux-thunk";

interface IConfig {
  offset: number;
  pageSize: number;
  searchTerm: string;
  sort: {
    columnId: keyof Employee;
    order: "asc" | "desc";
  };
}

interface EmployeesState {
  data: Employee[];
  total: number;
  config: IConfig;
  loading: boolean;
}

const SET_EMPLOYEES = "SET_EMPLOYEES";
const ADD_EMPLOYEES = "ADD_EMPLOYEES";
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const UPDATE_EMPLOYEE_ID = "UPDATE_EMPLOYEE_ID";
const SET_EMPLOYEE = "SET_EMPLOYEE";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
const SET_CONFIG = "SET_CONFIG";

const employeesReducer = (
  state: EmployeesState = {
    data: [],
    total: 0,
    config: {
      offset: 0,
      pageSize: 10,
      searchTerm: "",
      sort: {
        columnId: "employeeId",
        order: "asc",
      },
    },
    loading: false,
  },
  action: Action
) => {
  switch (action.type) {
    case SET_EMPLOYEES: {
      const { data, total } = action.payload;
      return {
        ...state,
        data,
        total,
      };
    }
    case ADD_EMPLOYEES: {
      const employees = action.payload;
      return {
        ...state,
        data: [...state.data, ...employees],
      };
    }
    case ADD_EMPLOYEE: {
      const employee = action.payload;
      return {
        ...state,
        data: [employee, ...state.data],
      };
    }
    case UPDATE_EMPLOYEE_ID: {
      const { oldId, newId } = action.payload;
      const data = state.data.map((employee) => {
        if (employee.employeeId === oldId) {
          return {
            ...employee,
            employeeId: newId,
          };
        }
        return employee;
      });
      return {
        ...state,
        data,
      };
    }
    case SET_EMPLOYEE: {
      const employee = action.payload;
      let found = false;
      const data = state.data.map((e) => {
        if (e.employeeId === employee.employeeId) {
          found = true;
          return employee;
        }
        return e;
      });
      if (!found) {
        data.push(employee);
      }
      return {
        ...state,
        data,
      };
    }
    case DELETE_EMPLOYEE: {
      const employeeId = action.payload;
      const data = state.data.filter((e) => e.employeeId !== employeeId);
      return {
        ...state,
        data,
      };
    }
    case SET_CONFIG: {
      const config = action.payload;
      return {
        ...state,
        config,
      };
    }
    default: {
      return state;
    }
  }
};

const setData = (employees: Employee[], total: number) => ({
  type: SET_EMPLOYEES,
  payload: { employees, total },
});

const setEmployee = (employee: Employee) => ({
  type: SET_EMPLOYEE,
  payload: employee,
});

export const updateEmployeeId = (oldId: string, newId: string) => ({
  type: UPDATE_EMPLOYEE_ID,
  payload: { oldId, newId },
});

export const deleteEmployee = (employeeId: string) => ({
  type: DELETE_EMPLOYEE,
  payload: employeeId,
});

export const setConfig = (config: IConfig) => ({
  type: SET_CONFIG,
  payload: config,
});

export const setConfigAndFetchData = (
  config: IConfig
): ThunkAction<void, State, undefined, Action> => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setConfig(config));
      const fetchDataProps: FetchDataProps<Employee> = {
        offset: config.offset,
        limit: config.pageSize,
        sortBy: config.sort.columnId,
        sortDir: config.sort.order,
      };
      const { data, total } = await API.getEmployees(fetchDataProps);
      dispatch(setData(data, total));
      return { data, total };
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getEmployeesError,
          type: "error",
        })
      );
    }
  };
};

export const fetchMoreData = (): ThunkAction<void, State, undefined, Action> => {
  return async (dispatch: Dispatch, getState) => {
    try {
      const { employees } = getState();
      const { config } = employees;
      const fetchDataProps: FetchDataProps<Employee> = {
        offset: config.offset + employees.data.length,
        limit: config.pageSize,
        sortBy: config.sort.columnId,
        sortDir: config.sort.order,
      };
      const { data, total } = await API.getEmployees(fetchDataProps);
      dispatch(setData(data, total));
      return { data, total };
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getEmployeesError,
          type: "error",
        })
      );
    }
  };
};

export default employeesReducer;
