import { AxiosError, AxiosRequestConfig } from "axios";

export const onRequest = (config: AxiosRequestConfig) => {
  const token = "";
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
