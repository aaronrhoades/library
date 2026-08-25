export interface IBookSearchFilter {
  title?: string;
  author?: string;
  available?: boolean;
  sortBy?: string;
  sortDirection?: string;
  pageNumber?: number;
  pageSize?: number;
}