import { isNotNil } from 'es-toolkit';
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
        {...register('review')}
        id="review"
        className="min-h-[200px]"
        placeholder="독후감을 작성해 보세요!"
      />
      {isNotNil(errors.review) && <p className="text-red-500">{errors.review.message}</p>}
    </>
  );
}
