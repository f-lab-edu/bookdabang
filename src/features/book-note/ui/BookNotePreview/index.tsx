'use client';

import { format } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { isNotNil } from 'es-toolkit';
import { Star, ThumbsUp, ThumbsDown, Quote, Calendar, Lock, Unlock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { BookDetail } from '@/entities/book';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';
import { useBookNotePreview } from '../../model/use-book-note-preview';

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
            {previewData.recommended === true && (
              <div className="flex items-center text-green-600">
                <ThumbsUp className="mr-1 size-5" />
                <span>추천</span>
              </div>
            )}
            {previewData.recommended === false && (
              <div className="flex items-center text-red-600">
                <ThumbsDown className="mr-1 size-5" />
                <span>비추천</span>
              </div>
            )}
            {isNotNil(previewData.rating) && (
              <div className="ml-4 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-5 w-5',
                      star <= previewData.rating!
                        ? 'fill-yellow-400 text-yellow-400'
                        : star - 0.5 <= previewData.rating!
                          ? 'half-filled fill-yellow-400 text-yellow-400'
                          : 'text-gray-300',
                    )}
                  />
                ))}
                <span className="ml-1">{previewData.rating}</span>
              </div>
            )}
          </div>
        </div>
        {previewData.review && (
          <Card>
            <CardHeader>
              <CardTitle>독후감</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="break-words">
                {previewData.review
                  .split('\n')
                  .map((paragraph, idx) => (paragraph ? <p key={idx}>{paragraph}</p> : <br key={idx} />))}
              </div>
            </CardContent>
          </Card>
        )}
        {previewData.quotes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Quote className="mr-2 size-5" />
                기억에 남는 문구
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previewData.quotes.map((quote, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary pl-4"
                  >
                    <blockquote className="italic">{quote.text}</blockquote>
                    {quote.page && <p className="mt-1 text-sm text-muted-foreground">Page {quote.page}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-1 size-4" />
            {previewData.readingInfo.startDate && previewData.readingInfo.endDate ? (
              <span className="text-sm text-muted-foreground">
                {format(new Date(previewData.readingInfo.startDate), 'MMM d, yyyy')} -{' '}
                {format(new Date(previewData.readingInfo.endDate), 'MMM d, yyyy')}
              </span>
            ) : previewData.readingInfo.startDate ? (
              <span className="text-sm text-muted-foreground">
                Started on {format(new Date(previewData.readingInfo.startDate), 'MMM d, yyyy')}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">읽은 날짜가 없습니다.</span>
            )}
          </div>
          <div className="flex items-center">
            {previewData.publish ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1"
              >
                <Unlock className="size-3" />
                공개
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1"
              >
                <Lock className="size-3" />
                비공개
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
