'use client';

import { useState } from 'react';
import { BookFilter, FilterType } from '@/features/book-filter';
import { BookSearch } from '@/features/book-search';

export default function BookControls() {
  const [filter, setFilter] = useState<FilterType>('new');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="mb-8">
      <BookSearch
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />
      <BookFilter
        currentFilter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}
