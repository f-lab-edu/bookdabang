'use client';

import { QueryBoundary } from '@/shared/ui/query-boundary';
import { BookNoteEditor } from '@/widgets/book-note';

export default function AsyncBookNoteEditor() {
  return (
    <QueryBoundary>
      <BookNoteEditor />
    </QueryBoundary>
  );
}
