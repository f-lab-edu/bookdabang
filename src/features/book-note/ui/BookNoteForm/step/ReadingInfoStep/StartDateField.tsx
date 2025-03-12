import { isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { DatePicker } from '@/shared/ui/date-picker';
import { Label } from '@/shared/ui/label';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

export default function StartDateField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="space-y-2">
      <Label htmlFor="startDate">읽기 시작한 날짜</Label>
      <Controller
        control={control}
        name="readingInfo.startDate"
        render={({ field }) => (
          <DatePicker
            id="startDate"
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            className={cn(isNotNil(errors.readingInfo?.startDate) && 'border-red-500 focus:ring-red-500')}
            aria-describedby={isNotNil(errors.readingInfo?.startDate) ? 'startDateError' : undefined}
            aria-invalid={isNotNil(errors.readingInfo?.startDate)}
          />
        )}
      />
      {isNotNil(errors.readingInfo?.startDate) && (
        <p
          id="startDateError"
          className="text-red-500"
        >
          {errors.readingInfo?.startDate?.message}
        </p>
      )}
    </div>
  );
}
