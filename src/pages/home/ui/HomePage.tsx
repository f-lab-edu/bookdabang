import { BookList } from '@/entities/book';
import { BookSearch } from '@/features/book-search';
import { BookTab } from '@/features/book-tab';
import { fetchBooks } from '../api/fetch-books';

type SearchParams = Promise<{ q?: string }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const { q } = await props.searchParams;
  const books = await fetchBooks({ q });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <BookSearch />
        <BookTab />
      </div>
      <BookList books={books} />
    </div>
  );
}
