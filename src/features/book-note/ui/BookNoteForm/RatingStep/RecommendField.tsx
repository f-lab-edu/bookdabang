import { isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { BookNoteFormSchema } from '../../../model/book-note-form-schema';

export default function RecommendField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="space-y-2">
      <Label required>이 책을 추천할까요?</Label>
      <Controller
        control={control}
        name="recommended"
        render={({ field }) => (
          <div className="flex gap-4">
            <Button
              ref={field.ref}
              type="button"
              variant={field.value === true ? 'default' : 'outline'}
              onClick={() => field.onChange(true)}
              className={cn(
                'flex w-[100px] items-center justify-center',
                isNotNil(errors.recommended) && 'border-red-500',
              )}
            >
              <ThumbsUp className="mr-2 size-5" />
              추천
            </Button>
            <Button
              type="button"
              variant={field.value === false ? 'default' : 'outline'}
              onClick={() => field.onChange(false)}
              className={cn(
                'flex w-[100px] items-center justify-center',
                isNotNil(errors.recommended) && 'border-red-500',
              )}
            >
              <ThumbsDown className="mr-2 size-5" />
              비추천
            </Button>
          </div>
        )}
      />
      {isNotNil(errors.recommended) && <p className="text-red-500">{errors.recommended.message}</p>}
    </div>
  );
}
