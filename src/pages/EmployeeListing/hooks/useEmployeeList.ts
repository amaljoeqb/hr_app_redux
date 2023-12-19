import { useState, useEffect, useRef } from "react";
import { useInfiniteList } from "../../../hooks";
import { Employee, } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchMoreData,
  setConfigAndFetchData,
} from "../../../store/slices/employees.slice";

export function useEmployeeList() {
  const dispatch = useAppDispatch();
  const { employees, skills, prevEmployees } = useAppSelector((state) => {
    return {
      employees: state.employees,
      skills: state.staticData.skills,
      prevEmployees: state.prevEmployees,
    };
  });
  const loadingIconRef = useRef(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { loadMoreData, ...employeeList } = useInfiniteList<Employee>({
    data: employees.data,
    id: "employeeId",
    total: employees.total,
    config: employees.config,
    setConfigAndFetchData: (config) => dispatch(setConfigAndFetchData(config)),
    fetchMoreData: async () => {
      dispatch(fetchMoreData());
    },
  });

  useEffect(() => {
    const { current } = loadingIconRef;
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
    if (current) {
      observer.observe(current);
    }

    return () => {
      // Stop observing when the component unmounts
      if (current) {
        observer.unobserve(current);
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
