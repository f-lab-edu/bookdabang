'use client';

import { useParams } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { useFormFunnel } from '@/shared/lib/form';
import { RenderCase } from '@/shared/ui/render-case';
import { useBookDetail } from '@/entities/book';
import { BookNoteFormValues } from '../../model/book-note-form-values';
import BookNoteFormActions from './BookNoteFormActions';
import ReadingInfoStep from './step/ReadingInfoStep';
import RatingStep from './step/RatingStep';
import ReviewStep from './step/ReviewStep';
import QuotesStep from './step/QuotesStep';
import VisibilityStep from './step/VisibilityStep';

const triggerFields: Record<number, (keyof BookNoteFormValues)[]> = {
  1: ['readingStatus', 'startDate', 'endDate'],
  2: ['recommended', 'overallRating'],
  3: ['content'],
  4: ['quotes'],
  5: ['visibility'],
};

export default function BookNoteForm() {
  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  const {
    form,
    navigation: { currentStep, isFirstStep, isLastStep, goToPreviousStep, goToNextStep },
  } = useFormFunnel<BookNoteFormValues>({
    totalSteps: 5,
  });

  const handleNext = async () => {
    const isValid = await form.trigger(triggerFields[currentStep]);
    if (isValid) goToNextStep();
  };

  return (
    <FormProvider {...form}>
      <form className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6">
        <RenderCase
          value={currentStep}
          cases={{
            1: <ReadingInfoStep book={book} />,
            2: <RatingStep />,
            3: <ReviewStep />,
            4: <QuotesStep />,
            5: <VisibilityStep />,
          }}
        />
        <BookNoteFormActions
          previousDisabled={isFirstStep}
          nextDisabled={isLastStep}
          onPrevious={goToPreviousStep}
          onNext={handleNext}
        />
      </form>
    </FormProvider>
  );
}
