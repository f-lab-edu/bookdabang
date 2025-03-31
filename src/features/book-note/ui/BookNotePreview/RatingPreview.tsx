import { memo } from 'react';
import { isNil } from 'es-toolkit';
import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';

interface RatingPreviewProps {
  rating: BookNoteFormSchema['rating'];
}

function RatingPreview({ rating }: RatingPreviewProps) {
  if (isNil(rating)) return null;

  return (
    <div className="ml-4 flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-5 w-5',
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : star - 0.5 <= rating
                ? 'half-filled fill-yellow-400 text-yellow-400'
                : 'text-gray-300',
          )}
        />
      ))}
      <span className="ml-1">{rating}</span>
    </div>
  );
}

export default memo(RatingPreview);
