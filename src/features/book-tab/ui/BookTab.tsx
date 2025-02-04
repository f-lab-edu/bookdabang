'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles, TrendingUp } from 'lucide-react';
import { TabType } from '@/entities/book';

export default function BookTab() {
  const searchParams = useSearchParams();
  const currentTab = (searchParams?.get('tab') ?? 'new') as TabType;

  return (
    <div className="flex space-x-8 border-b">
      <Link
        href="/?tab=new"
        className={`flex flex-col items-center pb-2 ${
          currentTab === 'new' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
        }`}
      >
        <Sparkles className="mb-1 size-6" />
        <span className="text-xs">신간</span>
      </Link>
      <Link
        href="/?tab=bestseller"
        className={`flex flex-col items-center pb-2 ${
          currentTab === 'bestseller' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
        }`}
      >
        <TrendingUp className="mb-1 size-6" />
        <span className="text-xs">베스트셀러</span>
      </Link>
    </div>
  );
}
