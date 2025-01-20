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

function fetchNewBooks() {
  const searchParams = new URLSearchParams({
    QueryType: 'ItemNewAll',
    MaxResults: '10',
    start: '1',
    SearchTarget: 'Book',
    output: 'js',
    Version: '20131101',
  });

  return aladinApi.get('ItemList.aspx', { searchParams });
}

function fetchSearchBooks(q: string) {
  const searchParams = new URLSearchParams({
    Query: q,
    MaxResults: '10',
    start: '1',
    SearchTarget: 'Book',
    output: 'js',
    Version: '20131101',
  });

  return aladinApi.get('ItemSearch.aspx', { searchParams });
}
