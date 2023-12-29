import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useCallback, useEffect } from "react";
import { loginUser, logoutUser } from "../../../store/slices/login.slice";
import { loginUserCall } from "../../../api/endpoints/login.api";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../../../api/services/login.helper";
import { showToast } from "../../../store/slices/toasts.slice";

interface IJwtPayload extends JwtPayload {
  username?: string;
}
const invalidLoginMsg = "Invalid Credentials";
const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const logIn = async (email: string, password: string) => {
    try {
      const authResponse = await loginUserCall({
        email,
        password,
      });
      if (authResponse) {
        const authToken = authResponse.access_token;
        const refreshToken = authResponse.refresh_token;
        setCookie("accessToken", authToken);
        setCookie("refreshToken", refreshToken);
        dispatch(loginUser());
        const decodedAccessToken: IJwtPayload = jwtDecode(authToken);
        console.log(decodedAccessToken.username);
        dispatch(
          showToast({
            message: `Welcome back ${decodedAccessToken.username}`,
            type: "success",
          })
        );
      }
    } catch (error: any) {
      console.log(error.message, "error in fetching the access token");
      dispatch(
        showToast({
          message: invalidLoginMsg,
          type: "error",
        })
      );
    }
  };

  const logOut = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(loginUser());
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken && decodedToken.exp! < currentTime) {
        logOut();
      }
    } else {
      logOut();
    }
  }, [dispatch, logOut]);

  return {
    user,
    logIn,
    logOut,
  };
};
export default useAuth;
