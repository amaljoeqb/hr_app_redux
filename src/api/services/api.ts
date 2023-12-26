import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { apiConfig } from "../";
import { onRequest, onRequestError } from "./interceptors/requestInterceptors";
import {
  onResponse,
  onResponseError,
} from "./interceptors/responseInterceptors";

const API: AxiosInstance = axios.create(apiConfig);

API.interceptors.request.use(
  onRequest as unknown as (
    value: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>,
  onRequestError
);
API.interceptors.response.use(
  onResponse as unknown as (
    value: AxiosResponse<any, any>
  ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>,
  onResponseError
);

export default API;
