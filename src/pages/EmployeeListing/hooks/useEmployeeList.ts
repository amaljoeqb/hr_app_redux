import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  IEmployeeDataConfig,
  fetchMoreData,
  setConfigAndFetchData,
} from "../../../store/slices/employees.slice";
const TABLE_PAGE_SIZE = 12;
const LIST_PAGE_SIZE = 12;

export function useEmployeeList() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees);
  const skills = useAppSelector((state) => state.staticData.skills);
  const prevEmployees = useAppSelector((state) => state.prevEmployees);
  const loadingIconRef = useRef(null);
  // page number null on infinite list view
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const defaultConfig = useMemo<IEmployeeDataConfig>(
    () => ({
      offset: 0,
      pageSize: LIST_PAGE_SIZE,
      searchTerm: "",
      sort: {
        columnId: "employeeId",
        order: "desc",
      },
      skillsIds: [],
    }),
    []
  );

  const { data, total, loading } = employees;

  const config = useMemo<IEmployeeDataConfig>(() => {
    const config = employees.config
      ? { ...employees.config }
      : { ...defaultConfig };
    if (pageNumber) {
      config.pageSize = TABLE_PAGE_SIZE;
      config.offset = (pageNumber - 1) * TABLE_PAGE_SIZE;
    }
    return config;
  }, [employees.config, defaultConfig, pageNumber]);

  // hasMore is only set to true for infinite list view
  const hasMore = (data.length < total || loading) && pageNumber === null;

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    dispatch(fetchMoreData());
  }, [dispatch, loading, hasMore]);

  function setSearchTerm(searchTerm: string) {
    setConfigAndFetchData({ ...config, searchTerm, offset: 0 });
  }

  function setSort(sort: IEmployeeDataConfig["sort"]) {
    dispatch(setConfigAndFetchData({ ...config, sort, offset: 0 }));
  }

  useEffect(() => {
    dispatch(setConfigAndFetchData(config));
  }, [config, dispatch]);

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

  const setSelectedSkills = (skillsIds: string[]) => {
    if (!employees.config) return;
    dispatch(
      setConfigAndFetchData({
        ...employees.config,
        skillsIds,
        offset: 0,
      })
    );
  };

  return {
    displayData: data,
    total,
    loading,
    hasMore,
    searchTerm: config.searchTerm,
    setSearchTerm,
    sort: config.sort,
    setSort,
    selectedSkills: employees.config?.skillsIds ?? defaultConfig.skillsIds,
    setSelectedSkills,
    skills,
    prevEmployees,
    loadingIconRef,
    pageNumber,
    setPageNumber,
    totalPageCount: Math.ceil(employees.total / TABLE_PAGE_SIZE),
  };
}
