'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/shared/ui/input';

const DEBOUNCE_DELAY_MS = 500;

export default function BookSearch() {
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    setSearchTerm(searchParams?.get('q') ?? '');
  }, [searchParams]);

  const router = useRouter();

  useEffect(
    function debounceSearch() {
      const debounceTimer = setTimeout(() => {
        router.push(`/?q=${searchTerm}`);
      }, DEBOUNCE_DELAY_MS);

      return () => clearTimeout(debounceTimer);
    },
    [router, searchTerm],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-4 flex gap-2">
      <Input
        aria-label="도서 검색"
        className="w-full"
        type="search"
        placeholder="제목, 저자로 도서 검색.."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}
