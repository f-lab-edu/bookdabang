import { Controller, useFormContext } from 'react-hook-form';
import { isNotNil } from 'es-toolkit';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label';
import { StarRating } from '@/shared/ui/star-rating';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

export default function RatingField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="space-y-2">
      <Label required>평점</Label>
      <Controller
        control={control}
        name="rating"
        render={({ field }) => (
          <StarRating
            {...field}
            className={cn(isNotNil(errors.rating) && 'ring-1 ring-red-500')}
          />
        )}
      />
      {isNotNil(errors.rating) && <p className="text-red-500">{errors.rating.message}</p>}
    </div>
  );
}
