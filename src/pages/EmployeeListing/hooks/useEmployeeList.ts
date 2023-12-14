import { useState, useCallback, useEffect, useRef } from "react";
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
  const loadingIconRef = useRef(null);

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
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Start observing the loading icon
    if (loadingIconRef.current) {
      observer.observe(loadingIconRef.current);
    }

    return () => {
      // Stop observing when the component unmounts
      if (loadingIconRef.current) {
        observer.unobserve(loadingIconRef.current);
      }
    };
  }, [loadMoreData]);

  return {
    ...employeeList,
    selectedSkills,
    setSelectedSkills,
    skills,
    prevEmployees,
    loadingIconRef,
  };
}
