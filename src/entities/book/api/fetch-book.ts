import { aladinApi } from '@/shared/api/aladin-api';
import { adaptBookDetailSuccessResponse } from './mapper';
import { BookDetailResponse, BookDetailSuccessResponse } from './response';

function isBookDetailSuccessResponse(response: BookDetailResponse): response is BookDetailSuccessResponse {
  return 'version' in response;
}

export async function fetchBook(isbn: string) {
  const searchParams = new URLSearchParams({
    itemIdType: 'ISBN13',
    cover: 'big',
    output: 'js',
    version: '20131101',
    itemId: isbn,
  });

  const response = aladinApi.get('ItemLookUp.aspx', { searchParams });
  const data = await response.json<BookDetailResponse>();
  if (isBookDetailSuccessResponse(data)) return adaptBookDetailSuccessResponse(data);
  throw new Error(data.errorMessage);
}
