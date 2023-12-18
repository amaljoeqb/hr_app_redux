import { Action, Employee } from "../../models";

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
}

const SET_EMPLOYEES = "SET_EMPLOYEES";
const ADD_EMPLOYEES = "ADD_EMPLOYEES";
const ADD_EMPLOYEE = "ADD_EMPLOYEE";
const UPDATE_EMPLOYEE_ID = "UPDATE_EMPLOYEE_ID";
const SET_EMPLOYEE = "SET_EMPLOYEE";
const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";

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
    default: {
      return state;
    }
  }
};

export const setEmployees = (employees: Employee[]) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const setEmployee = (employee: Employee) => ({
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

export default employeesReducer;
