import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { DatePicker } from '@/shared/ui/date-picker';
import { Label } from '@/shared/ui/label';
import { BookDetail } from '@/entities/book';
import { BookNoteFormValues } from '../../../../model/book-note-form-values';
import BookInfo from './BookInfo';
import ReadingInfoSelect from './ReadingInfoSelect';

interface ReadingInfoStepProps {
  book: BookDetail;
}

export default function ReadingInfoStep({ book }: ReadingInfoStepProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <BookInfo book={book} />
        <ReadingInfoSelect />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">읽기 시작한 날짜</Label>
            <Controller
              control={control}
              name="startDate"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </>
              )}
            ></Controller>
            {errors.startDate && <p className="text-red-500">읽기 시작한 날짜는 필수 값입니다.</p>}
          </div>
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
        </div>
      </CardContent>
    </Card>
  );
}
