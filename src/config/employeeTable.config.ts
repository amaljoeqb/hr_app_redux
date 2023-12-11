import { Column, ColumnKey } from "../components/ui/Table/Table";
import { Employee } from "../models";

export const columns: Column<Employee>[] = [
  { flex: 1, key: "employeeId", title: "ID", sortable: true },
  { flex: 3, key: "name", title: "Name", sortable: true },
  { flex: 2, key: "designation", title: "Designation", sortable: true },
  { flex: 2, key: "department", title: "Department", sortable: true },
  { flex: 3, key: "skills", title: "Skills", sortable: false },
  { flex: 1, key: "actions", title: "", sortable: false },
];

// column sets for different screen sizes
const large: Set<ColumnKey<Employee>> = new Set<ColumnKey<Employee>>([
  "employeeId",
  "name",
  "designation",
  "department",
  "skills",
  "actions",
]);
const medium: Set<ColumnKey<Employee>> = new Set<ColumnKey<Employee>>([
  "employeeId",
  "name",
  "designation",
  "department",
  "actions",
]);
const small: Set<ColumnKey<Employee>> = new Set<ColumnKey<Employee>>([
  "employeeId",
  "name",
  "actions",
]);

const extraSmall: Set<ColumnKey<Employee>> = new Set<ColumnKey<Employee>>([
  "name",
  "actions",
]);

export const columnIds = {
  large,
  medium,
  small,
  extraSmall,
};
