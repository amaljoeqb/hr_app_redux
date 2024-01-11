import { Employee } from "../models";
import { SortAttribute } from "../pages/EmployeeListing/components/SortButton";

export const sortAttributes: SortAttribute<Employee>[] = [
  { id: "employeeId", label: "ID" },
  { id: "name", label: "Name" },
  { id: "department", label: "Department" },
  { id: "designation", label: "Designation" },
];
