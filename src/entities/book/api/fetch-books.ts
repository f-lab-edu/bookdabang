import { aladinApi } from '@/shared/api/aladin-api';
import { TabType } from '../model/tab-type';
import { BookDTO } from './dto';

interface Response {
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

export interface FetchBooksParams {
  q?: string;
  tab?: TabType;
  pageParam: number;
  pageSize: number;
}

export async function fetchBooks({ q, tab, pageParam, pageSize }: FetchBooksParams) {
  const response = q ? fetchBookSearch(q, pageParam, pageSize) : fetchBookList(tab, pageParam, pageSize);
  const data = await response.json<Response>();
  return data;
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
