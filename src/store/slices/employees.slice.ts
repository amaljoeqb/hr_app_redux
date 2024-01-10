import { Action, Employee, FetchEmployeesProps } from "../../models";
import * as API from "../../api";
import { showToast } from "./toasts.slice";
import { errorMessages, successMessages } from "../../services";
import { AppThunk, Dispatch } from "../store";
import { IDataConfig } from "../../hooks/";

export interface IEmployeeDataConfig extends IDataConfig<Employee> {
  skillsIds: string[];
  pageNumber: number | null;
}

interface EmployeesState {
  data: Employee[];
  total: number;
  // if config is present, data should be available according to the config or loading should be true
  config?: IEmployeeDataConfig;
  loading: boolean;
}

export const PAGE_SIZE = 12;

const SET_EMPLOYEES = "SET_EMPLOYEES";
const ADD_EMPLOYEES = "ADD_EMPLOYEES";
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const UPDATE_EMPLOYEE_ID = "UPDATE_EMPLOYEE_ID";
const SET_EMPLOYEE = "SET_EMPLOYEE";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
const SET_CONFIG = "SET_CONFIG";
const SET_LOADING = "SET_LOADING";

const initialState: EmployeesState = {
  data: [],
  total: 0,
  config: undefined,
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
      let total = state.total;
      const data = state.data.map((e) => {
        if (e.employeeId === employee.employeeId) {
          found = true;
          return employee;
        }
        return e;
      });
      if (!found) {
        data.push(employee);
        total += 1;
      }
      return {
        ...state,
        data,
        total,
      };
    }
    case DELETE_EMPLOYEE: {
      const employeeId = action.payload as string;
      let total = state.total;
      const data = state.data.filter((e) => e.employeeId !== employeeId);
      if (state.data.length !== data.length) {
        total -= 1;
      }
      return {
        ...state,
        data,
        total,
      };
    }
    case SET_CONFIG: {
      const config = action.payload as IEmployeeDataConfig;
      return {
        ...state,
        config,
      };
    }
    case SET_LOADING: {
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

export const setConfig = (config: IEmployeeDataConfig | undefined) => ({
  type: SET_CONFIG,
  payload: config,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setConfigAndFetchData = (
  config: IEmployeeDataConfig
): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setConfig(config));
      dispatch(setLoading(true));
      const fetchDataProps: FetchEmployeesProps = {
        offset: config.pageNumber
          ? (config.pageNumber - 1) * PAGE_SIZE
          : config.offset,
        limit: config.pageSize,
        sortBy: config.sort.columnId,
        sortDir: config.sort.order,
        search: config.searchTerm,
        skills: config.skillsIds ?? [],
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

export const clearConfigAndFetchEmployee = (employeeId: string): AppThunk => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setConfig(undefined));
      dispatch(setLoading(true));
      const employee = await API.getEmployee(employeeId);
      dispatch(setEmployees([employee], 1));
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getEmployeeError(employeeId),
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
      const { config, total } = employees;
      if (!config) return;
      if (total === employees.data.length) return;
      const fetchDataProps: FetchEmployeesProps = {
        offset: config.offset + employees.data.length,
        limit: config.pageSize,
        sortBy: config.sort.columnId,
        sortDir: config.sort.order,
        search: config.searchTerm,
        skills: config.skillsIds ?? [],
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
  return async (dispatch: Dispatch, getState) => {
    const { employees } = getState();
    let oldEmployee = employees.data.find(
      (e: Employee) => e.employeeId === employee.employeeId
    );
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
      if (oldEmployee) {
        dispatch(setEmployee(oldEmployee));
      }
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
    if (!currentEmployee) return;
    try {
      dispatch(deleteEmployee(employeeId));
      await API.deleteEmployee(employeeId);
      const { config, total } = employees;
      if (config && employees.data.length < total) {
        const fetchDataProps: FetchEmployeesProps = {
          offset: config.offset + employees.data.length,
          limit: 1,
          sortBy: config.sort.columnId,
          sortDir: config.sort.order,
          search: config.searchTerm,
          skills: config.skillsIds ?? [],
        };
        const { data } = await API.getEmployees(fetchDataProps);
        dispatch(addEmployees(data));
      }
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
      dispatch(setEmployee(currentEmployee));
    }
  };

export default employeesReducer;
