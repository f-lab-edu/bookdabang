import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { StarRating } from '@/shared/ui/star-rating';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';
import { isNotNil } from 'es-toolkit';

export default function RatingField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="space-y-2">
      <Label>전체 평점</Label>
      <Controller
        control={control}
        name="rating"
        render={({ field }) => (
          <StarRating
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {isNotNil(errors.rating) && <p className="text-red-500">{errors.rating.message}</p>}
    </div>
  );
}
