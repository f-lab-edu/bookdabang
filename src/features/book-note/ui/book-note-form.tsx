'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@/shared/ui/button';
import { bookQueries } from '@/entities/book';
import ReadingInfoStep from './step/ReadingInfoStep';
import RatingStep from './step/RatingStep';
import ReviewStep from './step/ReviewStep';
import QuotesStep from './step/QuotesStep';
import VisibilityStep from './step/VisibilityStep';

const steps = ['book-info', 'rating', 'review', 'quotes', 'visibility'];

export default function BookNoteForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const { isbn } = useParams<{ isbn: string }>()!;

  const { data: book } = useSuspenseQuery(bookQueries.detail(isbn));

  return (
    <form className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6">
      {currentStep === 0 && <ReadingInfoStep book={book} />}
      {currentStep === 1 && <RatingStep />}
      {currentStep === 2 && <ReviewStep />}
      {currentStep === 3 && <QuotesStep />}
      {currentStep === 4 && <VisibilityStep />}

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          variant="outline"
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          >
            Next
          </Button>
        ) : (
          <Button type="button">Submit Review</Button>
        )}
      </div>
    </form>
  );
}
