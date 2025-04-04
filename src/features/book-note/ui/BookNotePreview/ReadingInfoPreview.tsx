import { memo } from 'react';
import { format } from 'date-fns';
import { isNotNil } from 'es-toolkit';
import { Calendar } from 'lucide-react';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';

interface ReadingInfoPreviewProps {
  readingInfo: BookNoteFormSchema['readingInfo'];
}

function ReadingInfoPreview({ readingInfo }: ReadingInfoPreviewProps) {
  return (
    <div className="flex items-center">
      <Calendar className="mr-1 size-4" />
      {isNotNil(readingInfo.startDate) && isNotNil(readingInfo.endDate) ? (
        <span className="text-sm text-muted-foreground">
          {format(new Date(readingInfo.startDate), 'MMM d, yyyy')} -{' '}
          {format(new Date(readingInfo.endDate), 'MMM d, yyyy')}
        </span>
      ) : isNotNil(readingInfo.startDate) ? (
        <span className="text-sm text-muted-foreground">
          Started on {format(new Date(readingInfo.startDate), 'MMM d, yyyy')}
        </span>
      ) : (
        <span className="text-sm text-muted-foreground">읽은 날짜가 없습니다.</span>
      )}
    </div>
  );
}

export default memo(ReadingInfoPreview);
