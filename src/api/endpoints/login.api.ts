import API from "../services/api";

const loginPostUrl = "auth/sign-in";

interface IloginUserCall {
  userName: string;
  password: string;
}
export interface ItokenResponse {
  access_token: string;
  refresh_token: string;
}
export const loginUserCall = async ({ userName, password }: IloginUserCall) => {
  const body = { username: userName, password };
  const response: ItokenResponse = await API.post(loginPostUrl, body);
  return response;
};
