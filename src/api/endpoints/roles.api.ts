import { API } from "..";

export const getRoles = async () => {
  const response = await API.get("/roles");
  return response.data;
};
