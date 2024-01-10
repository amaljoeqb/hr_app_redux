import { useCallback, useState } from "react";
import { useTable } from "../../../hooks";
import { Employee } from "../../../models";
import { columnIds } from "../../../config";
import {
  sortEmployees,
  filterEmployees,
  searchEmployees,
} from "../../../services/employee.helpers";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setAndDeletePrevEmployee } from "../../../store/slices/prevEmployees.slice";

export default function useEmployeeTable() {
  const dispatch = useAppDispatch();
  const { employees, skills, prevEmployees } = useAppSelector((state) => {
    return {
      employees: state.employees.data,
      skills: state.staticData.skills,
      prevEmployees: state.prevEmployees,
    };
  });
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
      dispatch(setAndDeletePrevEmployee(id, prevEmployee));
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
