import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { BookNoteFormValues } from '../../../../model/book-note-form-values';
import StarRating from '../../StarRating';
import RecommendField from './RecommendField';

export default function RatingStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>책 평가</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecommendField />
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
          ></Controller>
          {errors.overallRating && <p className="text-red-500">전체 평점은 필수 값입니다.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
