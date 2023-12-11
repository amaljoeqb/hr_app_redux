import { Employee } from "../../models";
import { API } from "..";
import {
  getEmployeeFromEmployeeGlobal,
  getEmployeeRequestFromEmployee,
} from "../services/converters";
import {
  EmployeeCreateResponse,
  EmployeeRequest,
  EmployeeResponse,
} from "../models";

export const getEmployees = async () => {
  const response: EmployeeResponse = await API.get("/employee");
  const employees: Employee[] = response.data.employees.map((employee) =>
    getEmployeeFromEmployeeGlobal(employee)
  );
  return employees;
};

export const getEmployee = async (id: string) => {
  const response = await API.get(`/employee/${id}`);
  return response.data;
};

export const createEmployee = async (data: Employee) => {
  const body: Partial<EmployeeRequest> = getEmployeeRequestFromEmployee(data);
  delete body.id;
  const response: EmployeeCreateResponse = await API.post("/employee", body);
  return response.data;
};

export const updateEmployee = async (data: Employee) => {
  const id = data.employeeId;
  const body = getEmployeeRequestFromEmployee(data);
  const response = await API.patch(`/employee/${id}`, body);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await API.delete(`/employee/${id}`);
  return response.data;
};
