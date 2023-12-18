import { ThunkAction } from "redux-thunk";
import { Action, IToast, ToastType } from "../../models";
import { Dispatch, State } from "../store";

export interface IShowToast {
  message: string;
  type: ToastType;
}

const ADD_TOAST = "ADD_TOAST";
const REMOVE_TOAST = "REMOVE_TOAST";

const toastsReducer = (state: IToast[] = [], action: Action) => {
  switch (action.type) {
    case ADD_TOAST:
      return [...state, action.payload];
    case REMOVE_TOAST:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

const addToast = (toast: IToast) => ({
  type: ADD_TOAST,
  payload: toast,
});

const removeToast = (id: number) => ({
  type: REMOVE_TOAST,
  payload: id,
});

export const showToast = ({
  message,
  type,
}: IShowToast): ThunkAction<void, State, unknown, Action> => {
  return (dispatch: Dispatch) => {
    const toast: IToast = {
      message,
      type,
      id: Date.now(),
    };
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    addToast(toast);
    return () => clearTimeout(timer);
  };
};

export default toastsReducer;