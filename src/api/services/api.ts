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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoiYW1hbC5qb2VAcWJ1cnN0LmNvbSIsImlhdCI6MTcwMzIyMjY5MCwiZXhwIjoxNzAzMjI2MjkwfQ.BjksgqpdNwINSNG8hoF0U4XVXGDmFzAkiJGeUmHdFzY";
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
