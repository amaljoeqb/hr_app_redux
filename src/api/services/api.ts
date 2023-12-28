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

API.interceptors.request.use(
  (config) => {
    const token = process.env.REACT_APP_API_TOKEN;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
