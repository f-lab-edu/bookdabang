'use client';

import { BookSearch } from '@/features/book-search';
import { BookTab } from '@/features/book-tab';

interface BookControlsProps {
  initialSearchTerm?: string;
}

export default function BookControls({ initialSearchTerm }: BookControlsProps) {
  return (
    <div className="mb-8">
      <BookSearch initialSearchTerm={initialSearchTerm} />
      <BookTab />
    </div>
  );
}
