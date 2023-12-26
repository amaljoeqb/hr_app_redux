import API from "../services/api";

const loginPostUrl = "https://vipinms.cloud/auth/sign-in";

export const loginUserCall = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const body = { username: email, password };
  const response: { access_token: string } = await API.post(loginPostUrl, body);
  return response;
};
