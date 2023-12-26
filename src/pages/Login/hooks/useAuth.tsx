import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useCallback, useEffect } from "react";
import { loginUser, logoutUser } from "../../../store/slices/login.slice";
import { loginUserCall } from "../../../api/endpoints/login.api";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const logIn = async (email: string, password: string) => {
    try {
      const authResponse = await loginUserCall({
        email,
        password,
      });
      if (authResponse) {
        const authToken = authResponse.access_token;
        dispatch(loginUser());
        setCookie("accessToken", authToken, { path: "/" });
      }
    } catch (error: any) {
      console.log(error.message, "error in fetching the access token");
    }
  };

  const logOut = useCallback(() => {
    removeCookie("accessToken", { path: "/" });
    dispatch(logoutUser());
  }, [dispatch, removeCookie]);

  useEffect(() => {
    const accessToken = cookies.accessToken;

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
  }, [cookies.accessToken, dispatch, logOut]);

  return {
    user,
    logIn,
    logOut,
  };
};
export default useAuth;
