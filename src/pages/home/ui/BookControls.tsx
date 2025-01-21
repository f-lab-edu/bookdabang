'use client';

import { useState } from 'react';
import { BookFilter, FilterType } from '@/features/book-filter';
import { BookSearch } from '@/features/book-search';

interface BookControlsProps {
  initialSearchTerm?: string;
}

export default function BookControls({ initialSearchTerm }: BookControlsProps) {
  const [filter, setFilter] = useState<FilterType>('new');

  return (
    <div className="mb-8">
      <BookSearch initialSearchTerm={initialSearchTerm} />
      <BookFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}
