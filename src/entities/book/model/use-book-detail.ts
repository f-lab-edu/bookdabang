import { useSuspenseQuery } from '@tanstack/react-query';
import { bookQueries } from '../api/book-queries';

export function useBookDetail(isbn: string) {
  const { data } = useSuspenseQuery(bookQueries.detail(isbn));

  return data;
}
