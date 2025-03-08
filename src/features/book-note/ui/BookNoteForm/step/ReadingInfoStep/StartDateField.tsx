import { isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
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
        name="startDate"
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {isNotNil(errors.startDate) && <p className="text-red-500">{errors.startDate.message}</p>}
    </div>
  );
}
