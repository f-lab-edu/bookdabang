import { memo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/shared/ui/card';
import { Book } from '../model/book';

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const { coverImage, title, author, publisher, publishDate } = book;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-row sm:flex-col">
        <div className="w-1/3 sm:w-full">
          <Image
            src={coverImage}
            alt={`${title} 표지`}
            width={200}
            height={300}
            className="size-full object-contain sm:h-64 sm:object-cover"
          />
        </div>
        <CardContent className="w-2/3 p-4 sm:w-full">
          <h3 className="mb-1 text-sm font-bold sm:mb-2 sm:text-lg">{title}</h3>
          <p className="mb-1 text-xs text-gray-600 sm:text-sm">{author}</p>
          <p className="mb-1 text-xs text-gray-600 sm:text-sm">{publisher}</p>
          <p className="text-xs text-gray-600 sm:text-sm">{publishDate}</p>
        </CardContent>
      </div>
    </Card>
  );
}

export default memo(BookCard);
