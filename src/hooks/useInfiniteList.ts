export interface IDataConfig<T> {
  offset: number;
  pageSize: number;
  searchTerm: string;
  sort: {
    columnId: keyof T;
    order: "asc" | "desc";
  };
}

export interface InfiniteListProps<T> {
  data: T[];
  loading: boolean;
  total: number;
  config: IDataConfig<T>;
  setConfigAndFetchData: (config: IDataConfig<T>) => void;
  fetchMoreData: () => Promise<void>;
}

export function useInfiniteList<T>(props: InfiniteListProps<T>) {
  const { data, total, setConfigAndFetchData, config, fetchMoreData, loading } =
    props;
  const hasMore = data.length < total || loading;

  async function loadMoreData() {
    if (loading || !hasMore) return;
    await fetchMoreData();
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
