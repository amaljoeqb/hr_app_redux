import {
  Employee,
  FetchEmployeesGlobalProps,
  FetchEmployeesProps,
} from "../../models";
import { API } from "..";
import {
  getEmployeeFromEmployeeGlobal,
  getEmployeeGlobalFetchParams,
  getEmployeeRequestFromEmployee,
} from "../services/converters";
import {
  EmployeeCreateResponse,
  EmployeeRequest,
  EmployeeResponse,
  EmployeesResponse,
} from "../models";

export const getEmployees = async (props: FetchEmployeesProps) => {
  const params: FetchEmployeesGlobalProps = getEmployeeGlobalFetchParams(props);
  const response: EmployeesResponse = await API.get("/employee", {
    params,
  });
  const employees: Employee[] = response.data.employees.map((employee) =>
    getEmployeeFromEmployeeGlobal(employee)
  );
  const total = response.data.count;
  return { data: employees, total };
};

export const getEmployee = async (id: string) => {
  const response: EmployeeResponse = await API.get(`/employee/${id}`);
  const employee = getEmployeeFromEmployeeGlobal(response.data);
  return employee;
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
