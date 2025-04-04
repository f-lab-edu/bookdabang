'use client';

import { useCallback } from 'react';
import { isNotNil } from 'es-toolkit';
import { FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { UsePersistentFormReturn } from '@/shared/lib/form';
import { FunnelProvider, useFunnel } from '@/shared/lib/funnel';
import { Form } from '@/shared/ui/form';
import { RenderCase } from '@/shared/ui/render-case';
import { BookDetail } from '@/entities/book';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';
import { stepFields } from '../../model/step-fields';
import BookNoteFormActions from './BookNoteFormActions';
import ReadingInfoStep from './ReadingInfoStep';
import RatingStep from './RatingStep';
import ReviewStep from './ReviewStep';
import QuotesStep from './QuotesStep';
import PublishStep from './PublishStep';

interface BookNoteFormProps {
  book: BookDetail;
  form: UsePersistentFormReturn<BookNoteFormSchema>;
}

export default function BookNoteForm({ book, form }: BookNoteFormProps) {
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
