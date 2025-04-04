import { isNotNil } from 'es-toolkit';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormSchema } from '../../../model/book-note-form-schema';

export default function ReviewField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        {...register('review')}
        id="review"
        placeholder="독후감을 작성해 보세요!"
        className={cn('min-h-[200px]', isNotNil(errors.review) && 'border-red-500 focus-visible:ring-red-500')}
        aria-describedby={isNotNil(errors.review) ? 'reviewError' : undefined}
        aria-invalid={isNotNil(errors.review)}
      />
      {isNotNil(errors.review) && (
        <p
          id="reviewError"
          className="text-red-500"
        >
          {errors.review.message}
        </p>
      )}
    </div>
  );
}
