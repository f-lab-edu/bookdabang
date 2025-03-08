import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

export default function ReviewField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  return (
    <>
      <Textarea
        {...register('content', { required: true })}
        id="content"
        className="min-h-[200px]"
        placeholder="독후감을 작성해 보세요!"
      />
      {errors.content && <p className="text-red-500">독후감은 필수 값입니다.</p>}
    </>
  );
}
