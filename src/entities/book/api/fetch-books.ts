import { aladinApi } from '@/shared/api/aladin-api';
import { TabType } from '../model/tab-type';
import { BookDTO } from './dto';
import { adaptBookDTO } from './mapper';

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
}

export async function fetchBooks({ q, tab }: FetchBooksParams) {
  const response = q ? fetchBookSearch(q) : fetchBookList(tab);
  const data = await response.json<Response>();
  return data.item.map(adaptBookDTO);
}

const baseSearchParams = {
  MaxResults: '10',
  start: '1',
  SearchTarget: 'Book',
  Cover: 'Big',
  output: 'js',
  Version: '20131101',
};

function fetchBookList(tab: TabType = 'new') {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    QueryType: tab === 'bestseller' ? 'Bestseller' : 'ItemNewAll',
  });

  return aladinApi.get('ItemList.aspx', { searchParams });
}

function fetchBookSearch(q: string) {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    Query: q,
  });

  return aladinApi.get('ItemSearch.aspx', { searchParams });
}
