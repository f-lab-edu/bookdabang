import { isNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { BookNoteFormValues } from '../../../../model/book-note-form-values';

export default function RecommendField() {
  const { control } = useFormContext<BookNoteFormValues>();

  return (
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
      />
    </div>
  );
}
