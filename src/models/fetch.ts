import { EmployeeGlobal } from "../api/models";
import { Employee } from "./employee";

export interface FetchDataProps<T> {
  offset: number;
  limit: number;
  sortBy: keyof T;
  sortDir: "asc" | "desc";
  search: string;
}

export interface FetchEmployeesProps extends FetchDataProps<Employee> {
  skills: string[];
}

export interface FetchEmployeesGlobalProps {
  offset: number;
  limit: number;
  sortDir: "asc" | "desc";
  search: string;
  skillIds: string;
  sortBy: string;
}

export interface FetchDataReturn<T> {
  data: T[];
  total: number;
}
