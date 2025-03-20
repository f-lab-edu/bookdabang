import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { isNotNil } from 'es-toolkit';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { CommaSeparatedInput } from '@/shared/ui/comma-separated-input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

export default function QuotesField() {
  const {
    control,
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
            <Label>문구 {index + 1}</Label>
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
            className={cn(isNotNil(errors.quotes?.[index]?.text) && 'border-red-500 focus-visible:ring-red-500')}
            aria-describedby={isNotNil(errors.quotes?.[index]?.text) ? `quote-${index}-text-error` : undefined}
            aria-invalid={isNotNil(errors.quotes?.[index]?.text)}
          />
          {isNotNil(errors.quotes?.[index]?.text) && (
            <p
              id={`quote-${index}-text-error`}
              className="text-red-500"
            >
              {errors.quotes[index].text.message}
            </p>
          )}
          <Controller
            control={control}
            name={`quotes.${index}.page`}
            render={({ field }) => (
              <CommaSeparatedInput
                {...field}
                placeholder="페이지 번호"
                className={cn(isNotNil(errors.quotes?.[index]?.page) && 'border-red-500 focus-visible:ring-red-500')}
                aria-describedby={isNotNil(errors.quotes?.[index]?.page) ? `quote-${index}-page-error` : undefined}
                aria-invalid={isNotNil(errors.quotes?.[index]?.page)}
              />
            )}
          />
          {isNotNil(errors.quotes?.[index]?.page) && (
            <p
              id={`quote-${index}-page-error`}
              className="text-red-500"
            >
              {errors.quotes[index].page.message}
            </p>
          )}
        </div>
      ))}
      {errors.quotes && <p className="text-red-500">{errors.quotes.message}</p>}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ text: '', page: null })}
      >
        문구 추가
      </Button>
    </>
  );
}
