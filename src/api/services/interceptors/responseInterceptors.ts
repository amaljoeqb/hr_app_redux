import { AxiosError, AxiosResponse } from "axios";
import { refreshFun, setCookie } from "../login.helper";
import API from "../api";

enum HTTP_STATUS {
  INFORMATION = 300,
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
}

export async function onResponseError(error: AxiosError): Promise<AxiosError> {
  const { config } = error;
  if (error.response?.status === HTTP_STATUS.SERVER_ERROR) {
    return Promise.reject(error.response.data);
  } else if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
    const refreshResponse = await refreshFun();
    if (refreshResponse) {
      setCookie("accessToken", refreshResponse.access_token);
      setCookie("refreshToken", refreshResponse.refresh_token);
      API(config!);
    } else {
      return Promise.reject(error.response.data);
    }
  }
  return Promise.reject(error.response);
}

export function onResponse(response: AxiosResponse) {
  if (
    response.status >= HTTP_STATUS.SUCCESS &&
    response.status < HTTP_STATUS.INFORMATION
  ) {
    return Promise.resolve(response.data);
  }
}
