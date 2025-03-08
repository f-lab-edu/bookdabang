'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
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

export default function BookNoteForm() {
  const { isbn } = useParams<{ isbn: string }>()!;

  const book = useBookDetail(isbn);

  const form = useForm<BookNoteFormSchema>({
    resolver: zodResolver(bookNoteFormSchema),
  });

  const funnel = useFunnel({ totalSteps: 5 });

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FunnelProvider funnel={funnel}>
      <Form {...form}>
        <form
          className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6"
          onSubmit={handleSubmit}
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
      </Form>
    </FunnelProvider>
  );
}
