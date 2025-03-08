import { Controller, useFormContext } from 'react-hook-form';
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
      <Label>전체 평점</Label>
      <Controller
        control={control}
        name="overallRating"
        rules={{ required: true }}
        render={({ field }) => (
          <StarRating
            rating={field.value}
            onRatingChange={field.onChange}
          />
        )}
      />
      {errors.overallRating && <p className="text-red-500">전체 평점은 필수 값입니다.</p>}
    </div>
  );
}
