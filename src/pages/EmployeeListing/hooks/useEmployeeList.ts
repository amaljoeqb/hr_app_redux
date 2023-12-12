import { useState, useCallback, useEffect } from "react";
import { columnIds } from "../../../config";
import { useApi, useInfiniteList } from "../../../hooks";
import { Employee, FetchDataProps } from "../../../models";
import {
  filterEmployees,
  searchEmployees,
} from "../../../services/employee.helpers";
import { useAppContext } from "../../../store/app.context";

export function useEmployeeList() {
  const appContext = useAppContext();
  const { getEmployees } = useApi();
  const { skills, prevEmployees } = appContext.state;
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const searchFunction = useCallback((data: Employee[], searchTerm: string) => {
    return searchEmployees(data, searchTerm, [
      "employeeId",
      "name",
      "department",
    ]);
  }, []);

  const filterFunction = useCallback(
    (data: Employee[]) => filterEmployees(data, selectedSkills),
    [selectedSkills]
  );

  const fetchData = useCallback(async (props: FetchDataProps<Employee>) => {
    console.log("fetchData");
    const response = await getEmployees(props);
    return (
      response || {
        data: [],
        total: 0,
      }
    );
  }, []);

  const { loadMoreData, ...employeeList } = useInfiniteList<Employee>({
    searchFunction,
    filterFunction,
    id: "employeeId",
    fetchData,
  });

  useEffect(() => {
    function handleScroll() {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (bottom) {
        loadMoreData();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreData]);

  return {
    ...employeeList,
    selectedSkills,
    setSelectedSkills,
    skills,
    prevEmployees,
  };
}
