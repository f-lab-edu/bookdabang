'use client';

import { useParams } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunnelProvider, useFunnel } from '@/shared/lib/funnel';
import { Form } from '@/shared/ui/form';
import { RenderCase } from '@/shared/ui/render-case';
import { useBookDetail } from '@/entities/book';
import { BookNoteFormSchema, bookNoteFormSchema } from '../../model/book-note-form-schema';
import BookNoteFormActions from './BookNoteFormActions';
import ReadingInfoStep from './step/ReadingInfoStep';
import RatingStep from './step/RatingStep';
import ReviewStep from './step/ReviewStep';
import QuotesStep from './step/QuotesStep';
import VisibilityStep from './step/VisibilityStep';
import { isNotNil } from 'es-toolkit';

const triggerFields = new Map<number, (keyof BookNoteFormSchema)[]>([
  [1, ['readingInfo']],
  [2, ['recommended', 'overallRating']],
  [3, ['content']],
  [4, ['quotes']],
  [5, ['visibility']],
]);

export default function BookNoteForm() {
  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  const form = useForm<BookNoteFormSchema>({
    resolver: zodResolver(bookNoteFormSchema),
  });

  const funnel = useFunnel({ totalSteps: 5 });

  const onSubmit = (data: BookNoteFormSchema) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<BookNoteFormSchema>) => {
    for (const [step, fields] of triggerFields.entries()) {
      for (const field of fields) {
        if (isNotNil(errors[field])) {
          funnel.goToStep(step);

          setTimeout(() => {
            form.trigger(triggerFields.get(step));
          }, 500);

          return;
        }
      }
    }
  };

  return (
    <FunnelProvider funnel={funnel}>
      <Form {...form}>
        <form
          className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6"
          onSubmit={form.handleSubmit(onSubmit, onError)}
          noValidate
        >
          <RenderCase
            value={funnel.currentStep}
            cases={{
              1: <ReadingInfoStep book={book} />,
              2: <RatingStep />,
              3: <ReviewStep />,
              4: <QuotesStep />,
              5: <VisibilityStep />,
            }}
          />
          <BookNoteFormActions />
        </form>
        <DevTool control={form.control} />
      </Form>
    </FunnelProvider>
  );
}
