import { Book } from './book';

export interface BooksResult {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  books: Book[];
}
