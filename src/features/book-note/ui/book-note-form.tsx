'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@/shared/ui/button';
import { bookQueries } from '@/entities/book';
import { BookNoteFormValues } from '../model/book-note-form-values';
import { ReadingStatus } from '../model/reading-status';
import ReadingInfoStep from './step/ReadingInfoStep';
import StepTwo from './step/StepTwo';
import StepThree from './step/StepThree';
import StepFour from './step/StepFour';
import StepFive from './step/StepFive';

const steps = ['book-info', 'rating', 'review', 'quotes', 'visibility'];

const formData: BookNoteFormValues = {
  readingStatus: ReadingStatus.WANT_TO_READ,
  startDate: new Date('2023-01-01'),
  endDate: new Date('2023-01-15'),
  recommended: null,
  overallRating: 4,
  content: '',
  quotes: [{ text: '', page: '' }],
  visibility: false,
};

export default function BookNoteForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const { isbn } = useParams<{ isbn: string }>()!;

  const { data: book } = useSuspenseQuery(bookQueries.detail(isbn));

  return (
    <form className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6">
      {currentStep === 0 && <ReadingInfoStep book={book} />}
      {currentStep === 1 && <StepTwo formData={formData} />}
      {currentStep === 2 && <StepThree formData={formData} />}
      {currentStep === 3 && <StepFour formData={formData} />}
      {currentStep === 4 && <StepFive formData={formData} />}

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
