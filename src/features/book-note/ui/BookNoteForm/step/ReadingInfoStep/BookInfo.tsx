import Image from 'next/image';
import { isNotEmpty } from '@/shared/lib/string-utils';
import { BookDetail } from '@/entities/book';

interface BookInfoProps {
  book: BookDetail;
}

export default function BookInfo({ book }: BookInfoProps) {
  return (
    <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
      <div className="space-y-2">
        <Image
          src={book.coverImage}
          alt={`${book.title} 표지`}
          width={200}
          height={300}
          className="object-cover"
        />
        <p>
          <strong>출판사:</strong> {book.publisher}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>페이지:</strong> {book.pageCount}쪽
        </p>
        {isNotEmpty(book.description) && (
          <p>
            <strong>설명:</strong> {book.description}
          </p>
        )}
      </div>
    </div>
  );
}
