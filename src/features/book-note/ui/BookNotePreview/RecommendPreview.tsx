import { memo } from 'react';
import { isNil } from 'es-toolkit';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';

interface RecommendPreviewProps {
  recommended: BookNoteFormSchema['recommended'];
}

function RecommendPreview({ recommended }: RecommendPreviewProps) {
  if (isNil(recommended)) return null;

  if (recommended) {
    return (
      <div className="flex items-center text-green-600">
        <ThumbsUp className="mr-1 size-5" />
        <span>추천</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-red-600">
      <ThumbsDown className="mr-1 size-5" />
      <span>비추천</span>
    </div>
  );
}

export default memo(RecommendPreview);
