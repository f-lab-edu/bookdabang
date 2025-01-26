'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export default function BookSearch() {
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams?.get('q') ?? '');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?q=${searchTerm}`);
  };

  return (
    <form
      className="mb-4 flex gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        aria-label="도서 검색"
        className="w-full"
        type="search"
        placeholder="제목, 저자로 도서 검색.."
        value={searchTerm}
        onChange={handleChange}
      />
      <Button
        aria-label="검색하기"
        type="submit"
      >
        검색
      </Button>
    </form>
  );
}
