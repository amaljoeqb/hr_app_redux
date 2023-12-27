import { Action, Employee, FetchDataProps } from "../../models";
import * as API from "../../api";
import { showToast } from "./toasts.slice";
import { errorMessages, successMessages } from "../../services";
import { AppThunk, Dispatch } from "../store";

export interface IEmployeeDataConfig {
  offset: number;
  pageSize: number;
  searchTerm: string;
  sort: {
    columnId: keyof Employee;
    order: "asc" | "desc";
  };
  skillsIds?: string[];
}

interface EmployeesState {
  data: Employee[];
  total: number;
  config: IEmployeeDataConfig;
  loading: boolean;
}

const SET_EMPLOYEES = "SET_EMPLOYEES";
const ADD_EMPLOYEES = "ADD_EMPLOYEES";
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const UPDATE_EMPLOYEE_ID = "UPDATE_EMPLOYEE_ID";
const SET_EMPLOYEE = "SET_EMPLOYEE";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
const SET_CONFIG = "SET_CONFIG";

const initialState: EmployeesState = {
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
};

const employeesReducer = (
  state: EmployeesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case SET_EMPLOYEES: {
      const { data, total } = action.payload as {
        data: Employee[];
        total: number;
      };
      return {
        ...state,
        data,
        total,
      };
    }
    case ADD_EMPLOYEES: {
      const employees = action.payload as Employee[];
      return {
        ...state,
        data: [...state.data, ...employees],
      };
    }
    case ADD_EMPLOYEE: {
      const employee = action.payload as Employee;
      return {
        ...state,
        data: [employee, ...state.data],
      };
    }
    case UPDATE_EMPLOYEE_ID: {
      const { oldId, newId } = action.payload as {
        oldId: string;
        newId: string;
      };
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
      const employee = action.payload as Employee;
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
      const employeeId = action.payload as string;
      const data = state.data.filter((e) => e.employeeId !== employeeId);
      return {
        ...state,
        data,
      };
    }
    case SET_CONFIG: {
      const config = action.payload as IEmployeeDataConfig;
      return {
        ...state,
        config,
      };
    }
    case "SET_LOADING": {
      const loading = action.payload as boolean;
      return {
        ...state,
        loading,
      };
    }
    default: {
      return state;
    }
  }
};

const setEmployees = (employees: Employee[], total: number) => ({
  type: SET_EMPLOYEES,
  payload: { data: employees, total },
});

const setEmployee = (employee: Employee) => ({
  type: SET_EMPLOYEE,
  payload: employee,
});

const addEmployees = (employees: Employee[]) => ({
  type: ADD_EMPLOYEES,
  payload: employees,
});

export const updateEmployeeId = (oldId: string, newId: string) => ({
  type: UPDATE_EMPLOYEE_ID,
  payload: { oldId, newId },
});

export const deleteEmployee = (employeeId: string) => ({
  type: DELETE_EMPLOYEE,
  payload: employeeId,
});

export const setConfig = (config: IEmployeeDataConfig) => ({
  type: SET_CONFIG,
  payload: config,
});

export const setLoading = (loading: boolean) => ({
  type: "SET_LOADING",
  payload: loading,
});

export const setConfigAndFetchData = (
  config: IEmployeeDataConfig
): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setConfig(config));
      dispatch(setLoading(true));
      const fetchDataProps: FetchDataProps<Employee> = {
        offset: config.offset,
        limit: config.pageSize,
        sortBy: config.sort.columnId,
        sortDir: config.sort.order,
      };
      const { data, total } = await API.getEmployees(fetchDataProps);
      dispatch(setEmployees(data, total));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getEmployeesError,
          type: "error",
        })
      );
      dispatch(setLoading(false));
    }
  };
};

export const fetchMoreData = (): AppThunk => {
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
      dispatch(setLoading(true));
      const { data } = await API.getEmployees(fetchDataProps);
      dispatch(addEmployees(data));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getEmployeesError,
          type: "error",
        })
      );
      dispatch(setLoading(false));
    }
  };
};

export const fetchEmployee = (employeeId: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      const employee = await API.getEmployee(employeeId);
      dispatch(setEmployee(employee));
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getEmployeeError(employeeId),
          type: "error",
        })
      );
    }
  };
};

export const createEmployee = (employee: Employee): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setEmployee(employee));
      const response = await API.createEmployee(employee);
      const receivedId = response.id.toString();
      if (receivedId !== employee.employeeId) {
        dispatch(updateEmployeeId(employee.employeeId, receivedId));
      }
      dispatch(
        showToast({
          message: successMessages.createEmployeeSuccess(employee.name),
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.createEmployeeError(employee.name),
          type: "error",
        })
      );
      dispatch(deleteEmployee(employee.employeeId));
    }
  };
};

export const updateEmployee = (employee: Employee): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setEmployee(employee));
      await API.updateEmployee(employee);
      dispatch(
        showToast({
          message: successMessages.updateEmployeeSuccess(employee.name),
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.updateEmployeeError(employee.name),
          type: "error",
        })
      );
    }
  };
};

export const deleteEmployeeAndFetchMore =
  (employeeId: string): AppThunk =>
  async (dispatch, getState) => {
    const { employees } = getState();
    const currentEmployee = employees.data.find(
      (e: Employee) => e.employeeId === employeeId
    );
    try {
      dispatch(deleteEmployee(employeeId));
      const { config } = employees;
      const fetchDataProps: FetchDataProps<Employee> = {
        offset: config.offset + employees.data.length,
        limit: 1,
        sortBy: config.sort.columnId,
        sortDir: config.sort.order,
      };
      const { data } = await API.getEmployees(fetchDataProps);
      dispatch(addEmployees(data));
      dispatch(
        showToast({
          message: successMessages.deleteEmployeeSuccess(
            currentEmployee?.name ?? employeeId
          ),
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.deleteEmployeeError(
            currentEmployee?.name ?? employeeId
          ),
          type: "error",
        })
      );
    }
  };

export default employeesReducer;
