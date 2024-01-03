import { AxiosError, AxiosRequestConfig } from "axios";
import { getCookie } from "../login.helper";

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
