import API from "./api";
import { jwtDecode } from "jwt-decode";

const renewTokenUrl = "auth/renew-token";

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value?.split(`; ${name}=`) ?? [];
  if (parts && parts.length === 2) return parts?.pop()?.split(";")?.shift();
  return null;
}

export function setCookie(name: string, value: string) {
  const decodedToken = jwtDecode(value);
  const expiration = new Date(0); // Start with Unix epoch

  if (decodedToken && decodedToken.exp) {
    expiration.setUTCSeconds(decodedToken.exp);
  }

  const cookieValue =
    encodeURIComponent(value) +
    (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : "");

  document.cookie = `${name}=${cookieValue}; path=/`;
}
// export function setCookie(name: string, value: string) {
//   const decodedToken = jwtDecode(value);
//   const expiration = new Date();
//   console.log(decodedToken);
//   if (decodedToken && decodedToken.exp) {
//     expiration.setDate(expiration.getDate() + decodedToken.exp);
//   }
//   const cookieValue =
//     encodeURIComponent(value) +
//     (decodedToken.exp ? `; expires=${expiration.toUTCString()}` : "");

//   document.cookie = `${name}=${cookieValue}; path=/`;
// }

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const refreshFun = async () => {
  const refreshToken = getCookie("refreshToken");
  if (refreshToken) {
    console.log(refreshToken);
    try {
      const response: { access_token: string; refresh_token: string } =
        await API.post(renewTokenUrl, { refreshToken });
      console.log(response, "response from renewed post");
      return response;
    } catch (err) {
      console.log("try again, couldnt renew refresh token");
      return;
    }
  } else return;
};
