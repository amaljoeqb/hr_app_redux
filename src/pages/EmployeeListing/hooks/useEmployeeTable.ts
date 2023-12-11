import { useCallback, useEffect, useState } from "react";
import { useTable } from "../../../hooks";
import { Employee } from "../../../models";
import { useAppContext } from "../../../store/app.context";
import { columnIds } from "../../../config";

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

/**
 * Function to filter employees array based on selected skills
 * @param {Employee[]} employees - Array of employees
 * @param {number[]} selectedSkills - Array of selected skill ids
 */
function filterEmployees(employees: Employee[], selectedSkills: string[]) {
  if (selectedSkills.length > 0) {
    return employees.filter((item) => {
      return item.skills.find((skill) => {
        return selectedSkills.includes(skill.skillId);
      });
    });
  }
  return employees;
}

/**
 * Fuction to search employees array based on a search term
 * @param {array} employees - Array of employees
 * @param {string} searchTerm - Term to search for
 * @param {keyof Employee[]} fields - Fields to search in
 */
function searchEmployees(
  employees: Employee[],
  searchTerm: string,
  fields: (keyof Employee)[]
) {
  try {
    const lowerCaseValue = searchTerm.toLowerCase();
    return Object.values(employees).filter((employee) =>
      fields.some((field) => {
        const value = employee[field];
        if (typeof value === "string" || typeof value === "number") {
          return value.toString().toLowerCase().includes(lowerCaseValue);
        }
        if (Array.isArray(value)) {
          return false;
        }
        if (field === "department") {
          return value?.department
            .toString()
            .toLowerCase()
            .includes(lowerCaseValue);
        }
        return false;
      })
    );
  } catch (e) {
    return [];
  }
}

/**
 * Function to sort employees array based on an attribute
 * @param {Employee[]} employees - Array of employees
 * @param {keyof Employee} key - Name of the attribute to sort
 * @param {"asc" | "desc"} order - Order to sort the array in
 */
function sortEmployees(
  employees: Employee[],
  key: keyof Employee,
  order: "asc" | "desc"
): Employee[] {
  const asc = order === "asc";

  /**
   * Sorts two employees based on a numerical property.
   * @param a - The first employee.
   * @param b - The second employee.
   * @param key - The key of the numerical property to sort by.
   * @returns A negative number if `a` should be sorted before `b`, a positive number if `b` should be sorted before `a`, or 0 if they are equal.
   */
  const numericalSort = (a: Employee, b: Employee, key: "salary") => {
    if (!a[key] && !b[key]) {
      return 0;
    } else if (!a[key]) {
      return -1;
    } else if (!b[key]) {
      return 1;
    }

    if (a[key]! < b[key]!) {
      return asc ? -1 : 1;
    } else if (a[key]! > b[key]!) {
      return asc ? 1 : -1;
    }
    return 0;
  };

  /**
   * Sorts employees based on their employeeId in ascending or descending order.
   * @param a - The first employee object to compare.
   * @param b - The second employee object to compare.
   * @returns - A negative number if a should be sorted before b, a positive number if b should be sorted before a, or 0 if they are equal.
   */
  const idSort = (a: Employee, b: Employee) => {
    const aId = parseInt(a.employeeId);
    const bId = parseInt(b.employeeId);
    if (isNaN(aId) && isNaN(bId)) {
      return 0;
    } else if (isNaN(aId)) {
      return -1;
    } else if (isNaN(bId)) {
      return 1;
    }
    if (aId < bId) {
      return asc ? -1 : 1;
    } else if (aId > bId) {
      return asc ? 1 : -1;
    }
    return 0;
  };

  /**
   * Sorts an array of objects based on a specified key in an alphanumeric order.
   * @param a - The first object to compare.
   * @param b - The second object to compare.
   * @param key - The key to use for comparison. Can be "employeeId", "name", "designation", or "email".
   * @returns A negative number if a should be sorted before b, a positive number if a should be sorted after b, or 0 if they are equal.
   */
  const alphaNumericSort = (
    a: Employee,
    b: Employee,
    key: "employeeId" | "name" | "designation" | "email"
  ) => {
    if (!a[key] && !b[key]) {
      return 0;
    } else if (!a[key]) {
      return 1;
    } else if (!b[key]) {
      return -1;
    }
    const aString = a[key]!.toString().toLowerCase();
    const bString = b[key]!.toString().toLowerCase();
    if (aString < bString) {
      return asc ? -1 : 1;
    }
    if (aString > bString) {
      return asc ? 1 : -1;
    }
    return 0;
  };

  /**
   * Sorts employees based on their department name.
   * @param a - The first employee object to compare.
   * @param b - The second employee object to compare.
   * @returns A negative number if `a` should be sorted before `b`, a positive number if `a` should be sorted after `b`, or 0 if they are equal.
   */
  const departmentSort = (a: Employee, b: Employee) => {
    const aString = a.department?.department.toString().toLowerCase();
    const bString = b.department?.department.toString().toLowerCase();
    if (!aString && !bString) {
      return 0;
    }
    if (!aString) {
      return 1;
    }
    if (!bString) {
      return -1;
    }
    if (aString < bString) {
      return asc ? -1 : 1;
    }
    if (aString > bString) {
      return asc ? 1 : -1;
    }
    return 0;
  };

  switch (key) {
    case "employeeId":
      return employees.sort(idSort);
    case "salary":
      return employees.sort((a: Employee, b: Employee) =>
        numericalSort(a, b, key)
      );
    case "name":
    case "email":
    case "designation":
      return employees.sort((a: Employee, b: Employee) =>
        alphaNumericSort(a, b, key)
      );
    case "department":
      return employees.sort(departmentSort);
    default:
      return employees;
  }
}
