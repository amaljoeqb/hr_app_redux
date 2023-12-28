import API from "../services/api";

const loginPostUrl = "https://vipinms.cloud/auth/sign-in";

interface IloginUserCall {
  email: string;
  password: string;
}
export interface ItokenResponse {
  access_token: string;
  refresh_token: string;
}
export const loginUserCall = async ({ email, password }: IloginUserCall) => {
  const body = { username: email, password };
  const response: ItokenResponse = await API.post(loginPostUrl, body);
  return response;
};
