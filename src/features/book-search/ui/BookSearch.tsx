'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@toss/react';
import { Input } from '@/shared/ui/input';

const DEBOUNCE_DELAY_MS = 500;

export default function BookSearch() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') ?? '';

  const router = useRouter();
  const handleChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/?q=${e.target.value}`);
  }, DEBOUNCE_DELAY_MS);

  return (
    <div className="mb-4 flex gap-2">
      <Input
        aria-label="도서 검색"
        className="w-full"
        type="search"
        placeholder="제목, 저자로 도서 검색.."
        defaultValue={q}
        onChange={handleChange}
      />
    </div>
  );
}
