import { Book } from '../model/book';
import { BooksResult } from '../model/books-result';
import { BookDTO } from './dto';
import { BooksResponse } from './response';

function adaptBookDTO(dto: BookDTO): Book {
  return {
    id: dto.itemId,
    title: dto.title,
    author: dto.author,
    publisher: dto.publisher,
    publishDate: dto.pubDate,
    coverImage: dto.cover,
  };
}

export function adaptBooksResponse(response: BooksResponse): BooksResult {
  return {
    totalItems: response.totalResults,
    currentPage: response.startIndex,
    pageSize: response.itemsPerPage,
    books: response.item.map(adaptBookDTO),
  };
}
