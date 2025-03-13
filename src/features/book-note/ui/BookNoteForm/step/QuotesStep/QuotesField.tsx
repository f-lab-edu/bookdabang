import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

export default function QuotesField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookNoteFormSchema>();

  const { fields, append, remove } = useFieldArray({ name: 'quotes' });

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <Label htmlFor={`quote-${index}`}>문구 {index + 1}</Label>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              삭제
            </Button>
          </div>
          <Textarea
            {...register(`quotes.${index}.text`)}
            placeholder="기억에 남는 문구를 입력해 주세요"
          />
          {errors.quotes?.[index]?.text && <p className="text-red-500">{errors.quotes[index].text.message}</p>}
          <Input
            {...register(`quotes.${index}.page`)}
            type="number"
            className="w-32"
            placeholder="페이지 번호"
          />
          {errors.quotes?.[index]?.page && <p className="text-red-500">{errors.quotes[index].page.message}</p>}
        </div>
      ))}
      {errors.quotes && <p className="text-red-500">{errors.quotes.message}</p>}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ text: '', page: '' })}
      >
        문구 추가
      </Button>
    </>
  );
}
