import { Department, Skill } from "./";

export interface Employee {
  employeeId: string;
  name: string;
  email: string;
  designation?: string;
  department?: Department;
  skills: Skill[];
  salary?: number;
  joiningDate?: string;
  dateOfBirth?: string;
}
