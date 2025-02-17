import { isNotNil } from 'es-toolkit';
import { aladinApi } from '@/shared/api/aladin-api';
import { BookListTab } from '../model/book-list-tab';
import { adaptBookListSuccessResponse } from './mapper';
import { BookListResponse, BookListSuccessResponse } from './response';

export interface FetchBooksParams {
  q?: string;
  tab?: BookListTab;
  pageParam: number;
  pageSize: number;
}

function isBookListSuccessResponse(response: BookListResponse): response is BookListSuccessResponse {
  return 'version' in response;
}

export async function fetchBooks({ q, tab, pageParam, pageSize }: FetchBooksParams) {
  const response = isNotNil(q) ? fetchBookSearch(q, pageParam, pageSize) : fetchBookList(tab, pageParam, pageSize);
  const data = await response.json<BookListResponse>();
  if (isBookListSuccessResponse(data)) return adaptBookListSuccessResponse(data);
  throw new Error(data.errorMessage);
}

const baseSearchParams = {
  SearchTarget: 'Book',
  Cover: 'Big',
  output: 'js',
  Version: '20131101',
} as const;

function fetchBookList(tab: BookListTab = BookListTab.NEW, pageParam: number, pageSize: number) {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    QueryType: tab === BookListTab.BESTSELLER ? 'Bestseller' : 'ItemNewAll',
    MaxResults: pageSize.toString(),
    start: pageParam.toString(),
  });

  return aladinApi.get('ItemList.aspx', { searchParams });
}

function fetchBookSearch(q: string, pageParam: number, pageSize: number) {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    Query: q,
    MaxResults: pageSize.toString(),
    start: pageParam.toString(),
  });

  return aladinApi.get('ItemSearch.aspx', { searchParams });
}
