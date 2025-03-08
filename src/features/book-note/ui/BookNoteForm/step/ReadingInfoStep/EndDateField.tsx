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
        rules={{ required: true }}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
          />
        )}
      ></Controller>
      {errors.endDate && <p className="text-red-500">읽은 마지막 날짜는 필수 값입니다.</p>}
    </div>
  );
}
