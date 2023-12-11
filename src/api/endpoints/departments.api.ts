import { API } from "..";
import { Department } from "../../models";
import { DepartmentResponse } from "../models";
import { getDepartmentFromDepartmentGlobal } from "../services/converters";

export const getDepartments = async () => {
  const response: DepartmentResponse = await API.get("/departments");
  const departments: Department[] = response.map((department) =>
    getDepartmentFromDepartmentGlobal(department)
  );
  return departments;
};
