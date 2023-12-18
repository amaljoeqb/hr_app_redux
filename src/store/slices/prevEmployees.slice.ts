import { Action, Employee } from "../../models";
import { Dispatch } from "../store";

export type PrevEmployeesState = Map<String, Partial<Employee>>;

const SET_PREV_EMPLOYEE = "SET_PREV_EMPLOYEE";
const DELETE_PREV_EMPLOYEE = "DELETE_PREV_EMPLOYEE";

const prevEmployeesReducer = (
  state: PrevEmployeesState = new Map(),
  action: Action
) => {
  switch (action.type) {
    case SET_PREV_EMPLOYEE: {
      const newState = new Map(state);
      newState.set(action.payload.id, action.payload.employee);
      return newState;
    }
    case DELETE_PREV_EMPLOYEE: {
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

const setPrevEmployee = (id: string, employee: Partial<Employee>) => ({
  type: SET_PREV_EMPLOYEE,
  payload: { id, employee },
});

const deletePrevEmployee = (id: string, employee: Partial<Employee>) => ({
  type: DELETE_PREV_EMPLOYEE,
  payload: { id, employee },
});

export const setAndDeletePrevEmployee = (
  id: string,
  employee: Partial<Employee>
) => {
  return (dispatch: Dispatch) => {
    dispatch(setPrevEmployee(id, employee));
    const timer = setTimeout(() => {
      dispatch(deletePrevEmployee(id, employee));
    }, 3000);
    return () => clearTimeout(timer);
  };
};

export default prevEmployeesReducer;
