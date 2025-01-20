import { BookList } from '@/entities/book';
import { fetchBooks } from '../api/fetch-books';
import BookControls from './BookControls';

export default async function HomePage() {
  const books = await fetchBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <BookControls />
      <BookList books={books} />
    </div>
  );
}
