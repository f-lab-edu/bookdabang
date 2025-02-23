import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { BookDetail } from '@/entities/book';
import { ReadingStatus } from '../../model/reading-status';
import BookNoteFormActions from '../book-note-form-actions';

const readingStatusLabels = {
  [ReadingStatus.WANT_TO_READ]: '읽고 싶어요',
  [ReadingStatus.READING]: '읽고 있어요',
  [ReadingStatus.READ]: '읽었어요',
  [ReadingStatus.ON_HOLD]: '보류 중이에요',
  [ReadingStatus.DROPPED]: '포기했어요',
} as const;

interface ReadingInfoStepProps {
  book: BookDetail;
  onNext?: () => void;
}

export default function ReadingInfoStep({ book, onNext }: ReadingInfoStepProps) {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
          <CardDescription>by {book.author}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="space-y-2">
              <Image
                src={book.coverImage}
                alt={`${book.title} 표지`}
                width={200}
                height={300}
                className="object-cover"
              />
              <p>
                <strong>출판사:</strong> {book.publisher}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>페이지:</strong> {book.pageCount}쪽
              </p>
            </div>
          </div>
          {!!book.description && (
            <div>
              <strong>설명:</strong>
              <p className="mt-2">{book.description}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label>읽기 상태</Label>
            <RadioGroup>
              {Object.values(ReadingStatus).map((status) => (
                <div
                  key={status}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={status}
                    id={status}
                  />
                  <Label
                    className="cursor-pointer"
                    htmlFor={status}
                  >
                    {readingStatusLabels[status]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">읽기 시작한 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    <span>날짜 선택</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">읽은 마지막 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    <span>날짜 선택</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
      <BookNoteFormActions
        previousDisabled
        onNext={onNext}
      />
    </form>
  );
}
