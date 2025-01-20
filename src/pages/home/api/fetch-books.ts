import { aladinApi } from '@/shared/api/aladin-client';
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

interface FetchBooksParams {
  q?: string;
}

export async function fetchBooks({ q }: FetchBooksParams) {
  const response = q ? fetchSearchBooks(q) : fetchNewBooks();
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

function fetchNewBooks() {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    QueryType: 'ItemNewAll',
  });

  return aladinApi.get('ItemList.aspx', { searchParams });
}

function fetchSearchBooks(q: string) {
  const searchParams = new URLSearchParams({
    ...baseSearchParams,
    Query: q,
  });

  return aladinApi.get('ItemSearch.aspx', { searchParams });
}
