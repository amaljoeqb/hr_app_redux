import { Employee, FetchDataProps } from "../../models";
import { API } from "..";
import {
  getEmployeeFromEmployeeGlobal,
  getEmployeeGlobalFetchParams,
  getEmployeeRequestFromEmployee,
} from "../services/converters";
import {
  EmployeeCreateResponse,
  EmployeeGlobal,
  EmployeeRequest,
  EmployeeResponse,
} from "../models";

export const getEmployees = async (props: FetchDataProps<Employee>) => {
  const params: FetchDataProps<EmployeeGlobal> =
    getEmployeeGlobalFetchParams(props);
  const response: EmployeeResponse = await API.get("/employee", {
    params,
  });
  const employees: Employee[] = response.data.employees.map((employee) =>
    getEmployeeFromEmployeeGlobal(employee)
  );
  const total = response.data.count;
  console.log(employees);
  return { data: employees, total };
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
