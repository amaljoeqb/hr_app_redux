import { useState, useCallback } from "react";
import { columnIds } from "../../../config";
import { useApi, useInfiniteList } from "../../../hooks";
import { Employee } from "../../../models";
import {
  filterEmployees,
  searchEmployees,
} from "../../../services/employee.helpers";
import { useAppContext } from "../../../store/app.context";

export function useEmployeeList() {
  const appContext = useAppContext();
  const api = useApi();
  const { employees, skills, prevEmployees } = appContext.state;
  const [columns, setColumns] = useState(columnIds.large);

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const searchFunction = useCallback(
    (data: Employee[], searchTerm: string) => {
      let fields = Array.from(columns).filter(
        (column) => column !== "actions"
      ) as (keyof Employee)[];
      return searchEmployees(data, searchTerm, fields);
    },
    [columns]
  );

  const filterFunction = useCallback(
    (data: Employee[]) => filterEmployees(data, selectedSkills),
    [selectedSkills]
  );

  const employeeList = useInfiniteList<Employee>({
    searchFunction,
    filterFunction,
    id: "employeeId",
    fetchData: async ({ offset, limit, sortBy, sortDir }) => {
      const data: Employee[] = [];
      const total = 0;
      return { data, total };
    },
  });

  return {
    ...employeeList,
    selectedSkills,
    setSelectedSkills,
    skills,
    employees,
    prevEmployees,
    columns,
    setColumns,
  };
}
