import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { fetchBooks, FetchBooksParams } from './fetch-books';
import { fetchBook } from './fetch-book';

export const bookQueries = {
  all: () => ['books'],
  infinite: (params: Pick<FetchBooksParams, 'q' | 'tab'>) =>
    infiniteQueryOptions({
      queryKey: [...bookQueries.all(), params, 'infinite'],
      queryFn: ({ pageParam = 1 }) =>
        fetchBooks({
          ...params,
          pageParam,
          pageSize: 10,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.books.length < 10) return null;
        return lastPageParam + 1;
      },
      select: (data) => data.pages.flatMap((page) => page.books),
    }),
  detail: (isbn: string) =>
    queryOptions({
      queryKey: [...bookQueries.all(), isbn],
      queryFn: () => fetchBook(isbn),
    }),
};
