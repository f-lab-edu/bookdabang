'use client';

import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { BookDetail } from '@/entities/book';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';
import { useBookNotePreview } from '../../model/use-book-note-preview';
import RecommendPreview from './RecommendPreview';
import RatingPreview from './RatingPreview';
import ReviewPreview from './ReviewPreview';
import QuotesPreview from './QuotesPreview';
import ReadingInfoPreview from './ReadingInfoPreview';
import PublishPreview from './PublishPreview';

interface BookNotePreviewProps {
  book: BookDetail;
  form: UseFormReturn<BookNoteFormSchema>;
  className?: string;
}

export default function BookNotePreview({ book, form, className }: BookNotePreviewProps) {
  const previewData = useBookNotePreview(form);

  return (
    <Card className={cn('w-[360px] shadow-lg', className)}>
      <CardHeader>
        <CardTitle>미리보기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="mb-4">
          <h1 className="text-base font-bold">{book.title}</h1>
          <p className="text-sm text-muted-foreground">by {book.author}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <RecommendPreview recommended={previewData.recommended} />
            <RatingPreview rating={previewData.rating} />
          </div>
        </div>
        <ReviewPreview review={previewData.review} />
        <QuotesPreview quotes={previewData.quotes} />
        <div className="mt-4 flex items-center justify-between">
          <ReadingInfoPreview readingInfo={previewData.readingInfo} />
          <PublishPreview publish={previewData.publish} />
        </div>
      </CardContent>
    </Card>
  );
}
