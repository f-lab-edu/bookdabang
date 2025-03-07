import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { bookQueries } from '../api/book-queries';
import { BookDetail } from './book';

export function useBookDetail(
  isbn: string,
  queryOptions?: UseSuspenseQueryOptions<BookDetail, Error, BookDetail, string[]>,
) {
  const { data } = useSuspenseQuery({ ...bookQueries.detail(isbn), ...queryOptions });

  return data;
}
