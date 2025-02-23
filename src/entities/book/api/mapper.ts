import { Book, BookDetail } from '../model/book';
import { BooksResult } from '../model/books-result';
import { BookDTO } from './dto';
import { BookDetailSuccessResponse, BookListSuccessResponse } from './response';

function adaptBookDTO(dto: BookDTO): Book {
  return {
    isbn: dto.isbn13,
    title: dto.title,
    author: dto.author,
    publisher: dto.publisher,
    publishDate: dto.pubDate,
    coverImage: dto.cover,
  };
}

export function adaptBookListSuccessResponse(response: BookListSuccessResponse): BooksResult {
  return {
    totalItems: response.totalResults,
    currentPage: response.startIndex,
    pageSize: response.itemsPerPage,
    books: response.item.map(adaptBookDTO),
  };
}

export function adaptBookDetailSuccessResponse(response: BookDetailSuccessResponse): BookDetail {
  const [book] = response.item;

  return {
    ...adaptBookDTO(book),
    pageCount: book.subInfo.itemPage,
  };
}
