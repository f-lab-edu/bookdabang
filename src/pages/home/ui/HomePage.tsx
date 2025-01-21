import { BookList } from '@/entities/book';
import { fetchBooks } from '../api/fetch-books';
import BookControls from './BookControls';

type SearchParams = Promise<{ q?: string }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const { q } = await props.searchParams;
  const books = await fetchBooks({ q });

  return (
    <div className="container mx-auto px-4 py-8">
      <BookControls initialSearchTerm={q} />
      <BookList books={books} />
    </div>
  );
}
