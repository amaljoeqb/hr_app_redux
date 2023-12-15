import { Employee } from "../../models";

export const employeesReducer = (
  state: Map<String, Employee>,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "SET_EMPLOYEES": {
      const newState = new Map(state);
      const employees: Employee[] = action.payload;
      newState.forEach((employee) => {
        state.set(employee.employeeId, employee);
      });
      return newState;
    }
    case "UPDATE_EMPLOYEE_ID": {
      const newState = new Map(state);
      const oldId = action.payload.oldId;
      const newId = action.payload.newId;
      const employee = state.get(oldId);
      if (employee) {
        employee.employeeId = newId;
        newState.set(newId, employee);
        newState.delete(oldId);
      }
      return newState;
    }
    case "SET_EMPLOYEE": {
      const newState = new Map(state);
      const employee = action.payload;
      newState.set(employee.employeeId, employee);
      return newState;
    }
    case "DELETE_EMPLOYEE": {
      const newState = new Map(state);
      const employeeId = action.payload;
      state.delete(employeeId);
      return newState;
    }
    default: {
      return state;
    }
  }
};
