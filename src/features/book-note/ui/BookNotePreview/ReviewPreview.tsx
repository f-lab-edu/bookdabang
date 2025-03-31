import { memo } from 'react';
import { isNil } from 'es-toolkit';
import { isEmpty } from '@/shared/lib/string-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';

interface ReviewPreviewProps {
  review: BookNoteFormSchema['review'];
}

function ReviewPreview({ review }: ReviewPreviewProps) {
  if (isNil(review) || isEmpty(review)) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>독후감</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="break-words">
          {review.split('\n').map((paragraph, idx) => (paragraph ? <p key={idx}>{paragraph}</p> : <br key={idx} />))}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ReviewPreview);
