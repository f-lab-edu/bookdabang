'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, TrendingUp } from 'lucide-react';
import { TabType } from '../model/tab-type';

export default function BookTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = (searchParams?.get('tab') ?? 'new') as TabType;

  return (
    <div className="flex space-x-8 border-b">
      <button
        className={`flex flex-col items-center pb-2 ${
          currentTab === 'new' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
        }`}
        onClick={() => router.replace('/?tab=new')}
      >
        <Sparkles className="mb-1 size-6" />
        <span className="text-xs">신간</span>
      </button>
      <button
        className={`flex flex-col items-center pb-2 ${
          currentTab === 'bestseller' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
        }`}
        onClick={() => router.replace('/?tab=bestseller')}
      >
        <TrendingUp className="mb-1 size-6" />
        <span className="text-xs">베스트셀러</span>
      </button>
    </div>
  );
}
