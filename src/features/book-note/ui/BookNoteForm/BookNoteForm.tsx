'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { match } from 'ts-pattern';
import { useBookDetail } from '@/entities/book';
import { BookNoteFormStep } from '../../model/book-note-form-step';
import ReadingInfoStep from './step/ReadingInfoStep';
import RatingStep from './step/RatingStep';
import ReviewStep from './step/ReviewStep';
import QuotesStep from './step/QuotesStep';
import VisibilityStep from './step/VisibilityStep';

export default function BookNoteForm() {
  const [step, setStep] = useState<BookNoteFormStep>(BookNoteFormStep.READING_INFO);

  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6">
      {match(step)
        .with(BookNoteFormStep.READING_INFO, () => (
          <ReadingInfoStep
            book={book}
            onNext={() => setStep(BookNoteFormStep.RATING)}
          />
        ))
        .with(BookNoteFormStep.RATING, () => (
          <RatingStep
            onPrevious={() => setStep(BookNoteFormStep.READING_INFO)}
            onNext={() => setStep(BookNoteFormStep.REVIEW)}
          />
        ))
        .with(BookNoteFormStep.REVIEW, () => (
          <ReviewStep
            onPrevious={() => setStep(BookNoteFormStep.RATING)}
            onNext={() => setStep(BookNoteFormStep.QUOTES)}
          />
        ))
        .with(BookNoteFormStep.QUOTES, () => (
          <QuotesStep
            onPrevious={() => setStep(BookNoteFormStep.REVIEW)}
            onNext={() => setStep(BookNoteFormStep.VISIBILITY)}
          />
        ))
        .with(BookNoteFormStep.VISIBILITY, () => <VisibilityStep onPrevious={() => setStep(BookNoteFormStep.QUOTES)} />)
        .exhaustive()}
    </div>
  );
}
