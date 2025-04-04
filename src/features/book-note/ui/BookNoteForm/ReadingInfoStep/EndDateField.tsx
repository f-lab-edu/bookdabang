import { isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { DatePicker } from '@/shared/ui/date-picker';
import { Label } from '@/shared/ui/label';
import { BookNoteFormSchema } from '../../../model/book-note-form-schema';

export default function EndDateField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="space-y-2">
      <Label htmlFor="endDate">읽은 마지막 날짜</Label>
      <Controller
        control={control}
        name="readingInfo.endDate"
        render={({ field }) => (
          <DatePicker
            id="endDate"
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            className={cn(isNotNil(errors.readingInfo?.endDate) && 'border-red-500 focus:ring-red-500')}
            aria-describedby={isNotNil(errors.readingInfo?.endDate) ? 'endDateError' : undefined}
            aria-invalid={isNotNil(errors.readingInfo?.endDate)}
          />
        )}
      />
      {isNotNil(errors.readingInfo?.endDate) && <p className="text-red-500">{errors.readingInfo?.endDate?.message}</p>}
    </div>
  );
}
