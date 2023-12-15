import Department from "./department";
import { Employee } from "./employee";
import Skill from "./skill";

export interface State {
  employees: Map<string, Employee>;
  staticData: {
    departments: Department[];
    skills: Skill[];
  };
  prevEmployees: Map<string, Partial<Employee>>;
}
