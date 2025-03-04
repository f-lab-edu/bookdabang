import { isNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { BookNoteFormValues } from '../../../model/book-note-form-values';
import StarRating from '../StarRating';

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
        <div className="space-y-3">
          <Label>이 책을 추천할까요?</Label>
          <Controller
            control={control}
            name="recommended"
            render={({ field }) => (
              <RadioGroup
                className="flex"
                value={isNil(field.value) ? undefined : field.value.toString()}
                onValueChange={(value) => field.onChange(value === 'true')}
              >
                <div>
                  <RadioGroupItem
                    value="true"
                    id="recommend-true"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="recommend-true"
                    className={cn(
                      'flex cursor-pointer items-center rounded-md border px-4 py-2 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground',
                      'hover:bg-muted',
                    )}
                  >
                    <ThumbsUp className="mr-2 size-5" />
                    추천
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="false"
                    id="recommend-false"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="recommend-false"
                    className={cn(
                      'flex cursor-pointer items-center rounded-md border px-4 py-2 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground',
                      'hover:bg-muted',
                    )}
                  >
                    <ThumbsDown className="mr-2 size-5" />
                    추천하지 않음
                  </Label>
                </div>
              </RadioGroup>
            )}
          ></Controller>
        </div>
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
