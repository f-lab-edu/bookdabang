import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/api/query-client';
import { bookQueries, TabType } from '@/entities/book';
import { BookSearch } from '@/features/book-search';
import { BookTab } from '@/features/book-tab';
import AsyncBookList from './AsyncBookList';

type SearchParams = Promise<{
  q?: string;
  tab?: TabType;
}>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const { q, tab } = await props.searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(bookQueries.infinite({ q, tab }));

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
