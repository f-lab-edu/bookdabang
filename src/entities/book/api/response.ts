import { BookDTO } from './dto';

export interface BookSuccessResponse {
  version: string;
  title: string;
  link: string;
  pubDate: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  query: string;
  searchCategoryId: number;
  searchCategoryName: string;
  item: BookDTO[];
}

export interface BookErrorResponse {
  errorCode: number;
  errorMessage: string;
}

export type BooksResponse = BookSuccessResponse | BookErrorResponse;
