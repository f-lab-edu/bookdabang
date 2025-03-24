'use client';

import { useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { isNotNil } from 'es-toolkit';
import { FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePersistentForm } from '@/shared/lib/form';
import { FunnelProvider, useFunnel } from '@/shared/lib/funnel';
import { Form } from '@/shared/ui/form';
import { RenderCase } from '@/shared/ui/render-case';
import { useBookDetail } from '@/entities/book';
import { BookNoteFormSchema, createBookNoteFormSchema } from '../../model/book-note-form-schema';
import { stepFields } from '../../model/step-fields';
import BookNoteFormActions from './BookNoteFormActions';
import ReadingInfoStep from './step/ReadingInfoStep';
import RatingStep from './step/RatingStep';
import ReviewStep from './step/ReviewStep';
import QuotesStep from './step/QuotesStep';
import PublishStep from './step/PublishStep';

const defaultValues: BookNoteFormSchema = {
  readingInfo: {
    readingStatus: null,
    startDate: null,
    endDate: null,
  },
  recommended: null,
  rating: null,
  review: '',
  quotes: [],
  publish: false,
};

export default function BookNoteForm() {
  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  const resolver = useMemo(() => zodResolver(createBookNoteFormSchema(book.pageCount)), [book.pageCount]);

  const form = usePersistentForm<BookNoteFormSchema>({
    resolver,
    defaultValues,
    storage: 'session',
    storageKey: `book-note-form-${isbn}`,
  });

  const onStepChange = useCallback(
    (step: number) => {
      for (const field of stepFields.get(step) ?? []) {
        const error = form.formState.errors[field];
        if (isNotNil(error)) {
          form.setFocus(field);
          return;
        }
      }
    },
    [form],
  );

  const funnel = useFunnel({
    totalSteps: 5,
    onStepChange,
  });

  const onSubmit = (data: BookNoteFormSchema) => {
    form.clearPersistentData();
    console.log(data);
  };

  const onError = (errors: FieldErrors<BookNoteFormSchema>) => {
    for (const [step, fields] of stepFields.entries()) {
      for (const field of fields) {
        if (isNotNil(errors[field])) {
          funnel.goToStep(step);
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
              5: <PublishStep />,
            }}
          />
          <BookNoteFormActions />
        </form>
        <DevTool control={form.control} />
      </Form>
    </FunnelProvider>
  );
}
