'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePersistentForm } from '@/shared/lib/form';
import { useBookDetail } from '@/entities/book';
import { BookNoteForm, BookNoteFormSchema, BookNotePreview, createBookNoteFormSchema } from '@/features/book-note';

const defaultValues: BookNoteFormSchema = {
  readingInfo: {
    readingStatus: null,
    startDate: null,
    endDate: null,
  },
  recommended: null,
  rating: null,
  review: '',
  quotes: [],
  publish: false,
};

export default function BookNoteEditor() {
  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  const resolver = useMemo(() => zodResolver(createBookNoteFormSchema(book.pageCount)), [book.pageCount]);

  const form = usePersistentForm<BookNoteFormSchema>({
    resolver,
    defaultValues,
    storage: 'session',
    storageKey: `book-note-form-${isbn}`,
  });

  return (
    <>
      <BookNoteForm
        book={book}
        form={form}
      />
      <BookNotePreview
        book={book}
        form={form}
        className="fixed right-4 top-4 h-fit"
      />
    </>
  );
}
