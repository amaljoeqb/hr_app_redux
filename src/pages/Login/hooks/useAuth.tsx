import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser, logoutUser } from "../../../store/slices/login.slice";
import { loginUserCall } from "../../../api/endpoints/login.api";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = cookies.accessToken;

    if (accessToken) {
      dispatch(loginUser());

      //   const decodedToken = jwtDecode(authToken); // jwt-decode npm package
      //   const currentTime = Math.floor(Date.now() / 1000);

      //   // Check token expiry
      //   if (decodedToken && decodedToken.exp! < currentTime) {
      //     logout();
      //   }
    } else {
      logOut();
    }
  }, [cookies.accessToken, dispatch]);

  const logIn = async (email: string, password: string) => {
    // setLoading(true);
    try {
      const authResponse = await loginUserCall({ email, password });

      if (authResponse) {
        const authToken = authResponse; // JWT Access Token
        console.log(authToken, "this is the accss tokn data");
        dispatch(loginUser());
        setCookie("accessToken", authToken, { path: "/" });
        // toast.success("Welcome. You are succesfully logged in.");
        // navigate("/");
        // setLoading(false);
      }
    } catch (error: any) {
      //   setLoading(false);
      console.log(error.message, "error in fetching the access token");
    }
  };

  const setTokenForInterceptor = () => {
    console.log("hi");
  };
  const logOut = () => {
    removeCookie("accessToken", { path: "/" });
    dispatch(logoutUser());
  };
  return {
    user,
    // loading,
    logIn,
    logOut,
  };
};

export default useAuth;
