import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/api/query-client';
import { BookList, bookQueries } from '@/entities/book';
import { BookSearch } from '@/features/book-search';
import { BookTab } from '@/features/book-tab';

type SearchParams = Promise<{ q?: string }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const { q } = await props.searchParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(bookQueries.list({ q }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <BookSearch />
          <BookTab />
        </div>
        <BookList />
      </div>
    </HydrationBoundary>
  );
}
