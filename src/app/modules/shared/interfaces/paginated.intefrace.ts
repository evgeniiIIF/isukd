export interface Paginated<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: Array<T>;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
