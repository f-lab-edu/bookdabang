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
  const response = await fetch(
    'https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbant12742104001&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101',
  );
  const data = (await response.json()) as Response;
  return data.item.map(adaptBookDTO);
}
