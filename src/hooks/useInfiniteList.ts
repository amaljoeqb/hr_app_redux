import { useState, useEffect } from "react";
import { FetchDataProps, FetchDataReturn } from "../models";

export interface InfiniteListProps<T> {
  fetchData: (
    props: FetchDataProps<T>
  ) => Promise<FetchDataReturn<T>> | FetchDataReturn<T>;
  searchFunction: (data: T[], term: string) => T[];
  filterFunction: (data: T[]) => T[];
  id: keyof T;
}

export function useInfiniteList<T>(props: InfiniteListProps<T>) {
  const { searchFunction, filterFunction, id, fetchData } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<{ key: keyof T; order: "asc" | "desc" }>({
    key: id,
    order: "desc",
  });
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [displayData, setDisplayData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const hasMore = data.length < total;

  useEffect(() => {
    let filtered = searchFunction(data, searchTerm);
    filtered = filterFunction(filtered);
    setDisplayData(filtered);
  }, [searchTerm, data, searchFunction, filterFunction]);

  useEffect(() => {
    const loadNewData = async () => {
      setLoading(true);
      const { data: newData, total: newTotal } = await fetchData({
        offset: 0,
        limit: 9,
        sortBy: sort.key,
        sortDir: sort.order,
      });
      setData(newData);
      setTotal(newTotal);
      setLoading(false);
    };
    loadNewData();
  }, [sort, fetchData]);

  async function loadMoreData() {
    if (loading || !hasMore) return;
    setLoading(true);
    const { data: newData, total: newTotal } = await fetchData({
      offset: data.length,
      limit: 10,
      sortBy: sort.key,
      sortDir: sort.order,
    });
    setData([...data, ...newData]);
    setTotal(newTotal);
    setLoading(false);
  }

  return {
    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    displayData,
    loadMoreData,
    total,
    loading,
    hasMore,
  };
}
