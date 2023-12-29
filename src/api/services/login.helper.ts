import useAuth from "../../pages/Login/hooks/useAuth";
import { useAppDispatch } from "../../store/store";
import { ItokenResponse } from "../endpoints/login.api";
import API from "./api";
import { jwtDecode } from "jwt-decode";

const renewTokenUrl = "auth/renew-tokens";
export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value?.split(`; ${name}=`) ?? [];
  if (parts && parts.length === 2) return parts?.pop()?.split(";")?.shift();
  return null;
}

export function setCookie(name: string, value: string) {
  const decodedToken = jwtDecode(value); //getting the payload of the token
  const expiration = new Date(0); // Start with Unix epoch

  if (decodedToken && decodedToken.exp) {
    expiration.setUTCSeconds(decodedToken.exp); //set expiration time of cookie with the expiration time of token
  }

  const cookieValue =
    encodeURIComponent(value) +
    (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : ""); //convert expiration time to string

  document.cookie = `${name}=${cookieValue}; path=/`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; //setting expiration time to epoch
}

export const refreshFun = async () => {
  const refreshToken = getCookie("refreshToken");
  if (refreshToken) {
    try {
      const response: ItokenResponse = await API.post(renewTokenUrl, {
        refreshToken,
      });
      return response;
    } catch (err) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      window.location.assign(`hr_app_react/login`);
      return;
    }
  } else return;
};
