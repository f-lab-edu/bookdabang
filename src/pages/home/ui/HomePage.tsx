import { redirect } from 'next/navigation';
import { isNotNil } from 'es-toolkit';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/api/query-client';
import { bookQueries, BookListTab } from '@/entities/book';
import { BookSearch } from '@/features/book-search';
import { BookTab } from '@/features/book-tab';
import AsyncBookList from './AsyncBookList';

type SearchParams = Promise<{
  q?: string;
  tab?: string;
}>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const { q, tab } = await props.searchParams;

  const isQueryValid = isNotNil(q) && q.trim() !== '';
  const isTabValid = isNotNil(tab) && Object.values<string>(BookListTab).includes(tab);
  if (!isQueryValid && !isTabValid) redirect('/?tab=new');

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(bookQueries.infinite({ q, tab: tab as BookListTab }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <BookSearch />
          {!q && <BookTab />}
        </div>
        <AsyncBookList />
      </div>
    </HydrationBoundary>
  );
}
