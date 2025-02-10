'use client';

import { QueryBoundary } from '@/shared/ui/query-boundary';
import { BookList } from '@/entities/book';

export default function AsyncBookList() {
  return (
    <QueryBoundary>
      <BookList />
    </QueryBoundary>
  );
}
