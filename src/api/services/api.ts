import axios, { AxiosInstance } from "axios";
import { apiConfig } from "../";

const API: AxiosInstance = axios.create(apiConfig);

// reject promise if status code not 200
API.interceptors.response.use(
  (response) => {
    if (response.status > 299) {
      return Promise.reject(response);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
