'use client';

import { useSearchParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { bookQueries } from '../api/book-queries';
import { TabType } from '../model/tab-type';
import BookCard from './BookCard';

export default function BookList() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') ?? undefined;
  const tab = (searchParams?.get('tab') as TabType | null) ?? undefined;

  const { data: books } = useSuspenseQuery(bookQueries.list({ q, tab }));

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}
    </div>
  );
}
