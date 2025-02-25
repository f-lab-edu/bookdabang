'use client';

import { useSearchParams } from 'next/navigation';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { InfiniteScroll } from '@/shared/ui/infinite-scroll';
import { bookQueries } from '../api/book-queries';
import { BookListTab } from '../model/book-list-tab';
import BookCard from './BookCard';

export default function BookList() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') ?? undefined;
  const tab = (searchParams?.get('tab') as BookListTab | null) ?? undefined;

  const {
    data: books,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(bookQueries.infinite({ q, tab }));

  return (
    <div className="space-y-6">
      <InfiniteScroll
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.isbn}
              book={book}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
