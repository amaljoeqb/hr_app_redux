import { Action } from "../../models";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

interface authState {
  user: {
    isAuth: boolean;
  };
}

const initialState: authState = {
  user: {
    isAuth: false,
  },
};

const authReducer = (
  state: authState = initialState,
  action: Action
): authState => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: { ...state.user, isAuth: true },
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: { ...state.user, isAuth: false },
      };
    default:
      return state;
  }
};

export const loginUser = () => ({
  type: LOGIN_USER,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export default authReducer;
