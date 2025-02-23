'use client';

import { QueryBoundary } from '@/shared/ui/query-boundary';
import { BookNoteForm } from '@/features/book-note';

export default function AsyncBookNoteForm() {
  return (
    <QueryBoundary>
      <BookNoteForm />
    </QueryBoundary>
  );
}
