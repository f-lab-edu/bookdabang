import { queryOptions } from '@tanstack/react-query';
import { fetchBooks } from './fetch-books';

export const bookQueries = {
  all: () => ['books'],
  lists: () => [...bookQueries.all(), 'list'],
  list: (params: { q?: string }) =>
    queryOptions({
      queryKey: [...bookQueries.lists(), params],
      queryFn: () => fetchBooks(params),
    }),
};
