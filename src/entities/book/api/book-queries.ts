import { queryOptions } from '@tanstack/react-query';
import { fetchBooks, FetchBooksParams } from './fetch-books';

export const bookQueries = {
  all: () => ['books'],
  lists: () => [...bookQueries.all(), 'list'],
  list: (params: FetchBooksParams) =>
    queryOptions({
      queryKey: [...bookQueries.lists(), params],
      queryFn: () => fetchBooks(params),
    }),
};
