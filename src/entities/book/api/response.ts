import { BookDTO, BookDetailDTO } from './dto';

// 목록 조회 응답
export interface BookListSuccessResponse {
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

// 상세 조회 응답
export interface BookDetailSuccessResponse {
  version: string;
  logo: string;
  title: string;
  link: string;
  pubDate: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  query: string;
  searchCategoryId: number;
  searchCategoryName: string;
  item: [BookDetailDTO];
}

export interface BookErrorResponse {
  errorCode: number;
  errorMessage: string;
}

export type BookListResponse = BookListSuccessResponse | BookErrorResponse;
export type BookDetailResponse = BookDetailSuccessResponse | BookErrorResponse;
