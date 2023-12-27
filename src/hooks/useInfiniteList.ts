import { useState, useEffect } from "react";
import { FetchDataProps, FetchDataReturn } from "../models";
import { IDataConfig } from "../store/slices/employees.slice";

export interface InfiniteListProps<T> {
  data: T[];
  total: number;
  config: IDataConfig<T>;
  setConfigAndFetchData: (config: IDataConfig<T>) => void;
  fetchMoreData: () => Promise<void>;
}

export function useInfiniteList<T>(props: InfiniteListProps<T>) {
  const { data, total, setConfigAndFetchData, config, fetchMoreData } = props;
  const [loading, setLoading] = useState(false);
  const hasMore = data.length < total;

  useEffect(() => {
    setConfigAndFetchData({ ...config, offset: 0 });
  }, []);

  async function loadMoreData() {
    if (loading || !hasMore) return;
    setLoading(true);
    await fetchMoreData();
    setLoading(false);
  }

  function setSearchTerm(searchTerm: string) {
    setConfigAndFetchData({ ...config, searchTerm, offset: 0 });
  }

  function setSort(sort: IDataConfig<T>["sort"]) {
    setConfigAndFetchData({ ...config, sort, offset: 0 });
  }

  return {
    searchTerm: config.searchTerm,
    setSearchTerm,
    sort: config.sort,
    setSort,
    displayData: data,
    loadMoreData,
    total,
    loading,
    hasMore,
  };
}
