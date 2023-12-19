import { Action, Employee } from "../../models";

interface uiState {
  deleteEmployeeDialog: {
    isOpen: boolean;
    employee: Employee | null;
  };
}

const uiReducer = (
  state: uiState = {
    deleteEmployeeDialog: {
      isOpen: false,
      employee: null,
    },
  } as uiState,
  action: Action
) => {
  switch (action.type) {
    case "OPEN_DELETE_EMPLOYEE_DIALOG": {
      return {
        ...state,
        deleteEmployeeDialog: {
          isOpen: true,
          employee: action.payload,
        },
      };
    }
    case "CLOSE_DELETE_EMPLOYEE_DIALOG": {
      return {
        ...state,
        deleteEmployeeDialog: {
          isOpen: false,
          employee: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const openDeleteEmployeeDialog = (employee: Employee) => ({
  type: "OPEN_DELETE_EMPLOYEE_DIALOG",
  payload: employee,
});

export const closeDeleteEmployeeDialog = () => ({
  type: "CLOSE_DELETE_EMPLOYEE_DIALOG",
});

export default uiReducer;
