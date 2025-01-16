import Image from 'next/image';
import { Card, CardContent } from '@/shared/ui/card';

interface BookCardProps {
  coverImage: string;
  title: string;
  author: string;
  publisher: string;
  publishDate: string;
}

export default function BookCard({ coverImage, title, author, publisher, publishDate }: BookCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-row sm:flex-col">
        <div className="w-1/3 sm:w-full">
          <Image
            src={coverImage}
            alt={`${title} 표지`}
            width={200}
            height={300}
            className="h-32 w-full object-cover sm:h-64"
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
