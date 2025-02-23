import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/api/query-client';
import { bookQueries } from '@/entities/book';
import AsyncBookNoteForm from './AsyncBookNoteForm';

type Params = Promise<{
  isbn: string;
}>;

export default async function BookNoteCreatePage(props: { params: Params }) {
  const { isbn } = await props.params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(bookQueries.detail(isbn));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AsyncBookNoteForm />
    </HydrationBoundary>
  );
}
