'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@/shared/ui/input';
import { useDebouncedSearch } from '../model/use-debounced-search';

export default function BookSearch() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') ?? '';

  const debouncedSearch = useDebouncedSearch();

  return (
    <div className="mb-4 flex gap-2">
      <Input
        aria-label="도서 검색"
        className="w-full"
        type="search"
        placeholder="제목, 저자로 도서 검색.."
        defaultValue={q}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
}
