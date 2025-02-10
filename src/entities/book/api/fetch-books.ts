import { isNotNil } from 'es-toolkit';
import { aladinApi } from '@/shared/api/aladin-api';
import { TabType } from '../model/tab-type';
import { adaptBooksSuccessResponse } from './mapper';
import { BooksResponse, BookSuccessResponse } from './response';

export interface FetchBooksParams {
  q?: string;
  tab?: TabType;
  pageParam: number;
  pageSize: number;
}

function isBookSuccessResponse(response: BooksResponse): response is BookSuccessResponse {
  return 'version' in response;
}

export async function fetchBooks({ q, tab, pageParam, pageSize }: FetchBooksParams) {
  const response = isNotNil(q) ? fetchBookSearch(q, pageParam, pageSize) : fetchBookList(tab, pageParam, pageSize);
  const data = await response.json<BooksResponse>();
  if (isBookSuccessResponse(data)) return adaptBooksSuccessResponse(data);
  throw new Error(data.errorMessage);
}

const baseSearchParams = {
  SearchTarget: 'Book',
  Cover: 'Big',
  output: 'js',
  Version: '20131101',
} as const;

function fetchBookList(tab: TabType = 'new', pageParam: number, pageSize: number) {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    QueryType: tab === 'bestseller' ? 'Bestseller' : 'ItemNewAll',
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
