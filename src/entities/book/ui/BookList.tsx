'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { bookQueries } from '../api/book-queries';
import { TabType } from '../model/tab-type';
import BookCard from './BookCard';

export default function BookList() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') ?? undefined;
  const tab = (searchParams?.get('tab') as TabType | null) ?? undefined;

  const { ref, inView } = useInView({ rootMargin: '0px 0px 300px 0px' });

  const {
    data: books,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(bookQueries.infinite({ q, tab }));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>
      <div
        ref={ref}
        aria-hidden="true"
      />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
