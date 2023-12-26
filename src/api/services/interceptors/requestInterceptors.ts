import { AxiosError, AxiosRequestConfig } from "axios";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: string[] = value?.split(`; ${name}=`) ?? [];
  if (parts && parts.length === 2) return parts?.pop()?.split(";")?.shift();
  return null;
}

const getAccessToken = () => getCookie("accessToken");

export const onRequest = (config: AxiosRequestConfig) => {
  const token = getAccessToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  config.headers = {
    "Content-type": "application/json",
    ...config.headers,
    ...headers,
  };
  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);
