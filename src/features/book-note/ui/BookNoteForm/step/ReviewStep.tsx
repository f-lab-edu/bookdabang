import { useFormContext } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormValues } from '../../../model/book-note-form-values';

export default function ReviewStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookNoteFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>독후감</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          {...register('content', { required: true })}
          id="content"
          className="min-h-[200px]"
          placeholder="독후감을 작성해 보세요!"
        />
        {errors.content && <p className="text-red-500">독후감은 필수 값입니다.</p>}
      </CardContent>
    </Card>
  );
}
