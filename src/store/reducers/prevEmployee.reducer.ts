import { Employee } from "../../models";

const prevEmployeeReducer = (
  state: Map<String, Partial<Employee>>,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case "SET_PREV_EMPLOYEE": {
      const newState = new Map(state);
      newState.set(action.payload.id, action.payload.employee);
      return newState;
    }
    case "DELETE_PREV_EMPLOYEE": {
      const newState = new Map(state);
      if (newState.get(action.payload.id) === action.payload.employee) {
        newState.delete(action.payload.id);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};
