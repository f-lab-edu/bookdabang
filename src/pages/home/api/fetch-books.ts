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

export async function fetchBooks() {
  const searchParams = new URLSearchParams({
    QueryType: 'ItemNewAll',
    MaxResults: '10',
    start: '1',
    SearchTarget: 'Book',
    output: 'js',
    Version: '20131101',
  });

  const data = await aladinApi.get('ItemList.aspx', { searchParams }).json<Response>();
  return data.item.map(adaptBookDTO);
}
