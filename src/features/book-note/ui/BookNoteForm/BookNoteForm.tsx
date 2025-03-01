'use client';

import { useParams } from 'next/navigation';
import { useFormFunnel } from '@/shared/lib/form';
import { RenderCase } from '@/shared/ui/render-case';
import { useBookDetail } from '@/entities/book';
import BookNoteFormActions from './BookNoteFormActions';
import ReadingInfoStep from './step/ReadingInfoStep';
import RatingStep from './step/RatingStep';
import ReviewStep from './step/ReviewStep';
import QuotesStep from './step/QuotesStep';
import VisibilityStep from './step/VisibilityStep';

export default function BookNoteForm() {
  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  const { navigation } = useFormFunnel({
    totalSteps: 5,
  });

  const { currentStep, isFirstStep, isLastStep, goToPreviousStep, goToNextStep } = navigation;

  return (
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
        onNext={goToNextStep}
      />
    </form>
  );
}
