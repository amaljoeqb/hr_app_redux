import { useCallback, useEffect, useState } from "react";
import { useTable } from "../../../hooks";
import { Employee } from "../../../models";
import { useAppContext } from "../../../store/app.context";
import { columnIds } from "../../../config";
import { sortEmployees, filterEmployees, searchEmployees } from "../../../services/employee.helpers";

export default function useEmployeeTable() {
  const appContext = useAppContext();
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
  const sortFunction = sortEmployees;
  const filterFunction = useCallback(
    (data: Employee[]) => filterEmployees(data, selectedSkills),
    [selectedSkills]
  );

  const employeeTable = useTable<Employee>({
    data: employees,
    searchFunction,
    sortFunction,
    filterFunction,
    id: "employeeId",
  });

  function onShowModifiedField(id: string, field: keyof Employee) {
    let prevEmployee = prevEmployees.get(id);
    if (prevEmployee) {
      delete prevEmployee[field];
      appContext.dispatch({
        type: "SET_PREV_EMPLOYEE",
        payload: { id, employee: prevEmployee },
      });
    }
  }

  return {
    ...employeeTable,
    selectedSkills,
    setSelectedSkills,
    skills,
    employees,
    prevEmployees,
    onShowModifiedField,
    columns,
    setColumns,
  };
}
