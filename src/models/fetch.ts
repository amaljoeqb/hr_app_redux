export interface FetchDataProps<T> {
  offset: number;
  limit: number;
  sortBy: keyof T;
  sortDir: "asc" | "desc";
}

export interface FetchDataReturn<T> {
  data: T[];
  total: number;
}
