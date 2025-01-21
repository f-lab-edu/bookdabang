import { Book } from '@/entities/book';
import { BookDTO } from './dto';

export function adaptBookDTO(dto: BookDTO): Book {
  return {
    id: dto.itemId,
    title: dto.title,
    author: dto.author,
    publisher: dto.publisher,
    publishDate: dto.pubDate,
    coverImage: dto.cover,
  };
}
