import { isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@/shared/ui/date-picker';
import { Label } from '@/shared/ui/label';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

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
        name="endDate"
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {isNotNil(errors.endDate) && <p className="text-red-500">{errors.endDate.message}</p>}
    </div>
  );
}
