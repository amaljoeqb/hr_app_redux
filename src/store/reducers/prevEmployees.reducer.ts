import { Action, Employee } from "../../models";

export type PrevEmployeesState = Map<String, Partial<Employee>>;

export const prevEmployeesReducer = (
  state: PrevEmployeesState = new Map(),
  action: Action
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
