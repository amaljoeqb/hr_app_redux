import { Dispatch } from "redux";
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

export const employeesReducer = (
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
    case "SET_EMPLOYEES": {
      const { data, total } = action.payload;
      return {
        ...state,
        data,
        total,
      };
    }
    case "ADD_EMPLOYEES": {
      const employees = action.payload;
      return {
        ...state,
        data: [...state.data, ...employees],
      };
    }
    case "ADD_EMPLOYEE": {
      const employee = action.payload;
      return {
        ...state,
        data: [employee, ...state.data],
      };
    }
    case "UPDATE_EMPLOYEE_ID": {
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
    case "SET_EMPLOYEE": {
      const employee = action.payload;
      const data = state.data.map((e) => {
        if (e.employeeId === employee.employeeId) {
          return employee;
        }
        return e;
      });
      return {
        ...state,
        data,
      };
    }
    case "DELETE_EMPLOYEE": {
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
