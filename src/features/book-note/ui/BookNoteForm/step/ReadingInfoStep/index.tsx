import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { BookDetail } from '@/entities/book';
import BookInfo from './BookInfo';
import ReadingStatusField from './ReadingStatusField';
import StartDateField from './StartDateField';
import EndDateField from './EndDateField';

interface ReadingInfoStepProps {
  book: BookDetail;
}

export default function ReadingInfoStep({ book }: ReadingInfoStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <BookInfo book={book} />
        <ReadingStatusField />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StartDateField />
          <EndDateField />
        </div>
      </CardContent>
    </Card>
  );
}
