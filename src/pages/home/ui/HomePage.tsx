'use client';

import { useState } from 'react';
import { BookList } from '@/entities/book';
import { BookFilter, FilterType } from '@/features/book-filter';
import { BookSearch } from '@/features/book-search';
import { useBooks } from '../model/books';

export default function HomePage() {
  const [filter, setFilter] = useState<FilterType>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const books = useBooks({ filter, searchTerm });

  return (
    <div className="container mx-auto px-4 py-8">
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
      <BookList books={books} />
    </div>
  );
}
