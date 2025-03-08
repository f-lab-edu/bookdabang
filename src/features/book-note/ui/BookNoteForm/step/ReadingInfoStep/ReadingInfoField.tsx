import { isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';
import { ReadingStatus } from '../../../../model/reading-status';

const readingStatusLabels = {
  [ReadingStatus.WANT_TO_READ]: '읽고 싶어요',
  [ReadingStatus.READING]: '읽고 있어요',
  [ReadingStatus.READ]: '읽었어요',
  [ReadingStatus.ON_HOLD]: '보류 중이에요',
  [ReadingStatus.DROPPED]: '포기했어요',
} as const;

export default function ReadingInfoField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="space-y-2">
      <Label
        required
        htmlFor="readingStatus"
      >
        읽기 상태
      </Label>
      <Controller
        control={control}
        name="readingStatus"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="readingStatus"
              className={cn('w-[200px]', isNotNil(errors.readingStatus) && 'border-red-500 focus:ring-red-500')}
              aria-describedby={isNotNil(errors.readingStatus) ? 'readingStatusError' : undefined}
              aria-invalid={isNotNil(errors.readingStatus)}
              aria-required="true"
            >
              <SelectValue placeholder="읽기 상태" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ReadingStatus).map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                >
                  {readingStatusLabels[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {isNotNil(errors.readingStatus) && (
        <p
          id="readingStatusError"
          className="text-red-500"
        >
          {errors.readingStatus.message}
        </p>
      )}
    </div>
  );
}
