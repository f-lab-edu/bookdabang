import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { BookDetail } from '@/entities/book';
import { BookNoteFormValues } from '../../../model/book-note-form-values';
import { ReadingStatus } from '../../../model/reading-status';

const readingStatusLabels = {
  [ReadingStatus.WANT_TO_READ]: '읽고 싶어요',
  [ReadingStatus.READING]: '읽고 있어요',
  [ReadingStatus.READ]: '읽었어요',
  [ReadingStatus.ON_HOLD]: '보류 중이에요',
  [ReadingStatus.DROPPED]: '포기했어요',
} as const;

interface ReadingInfoStepProps {
  book: BookDetail;
}

export default function ReadingInfoStep({ book }: ReadingInfoStepProps) {
  const { control } = useFormContext<BookNoteFormValues>();

  return (
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
          <Controller
            control={control}
            name="readingStatus"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="읽기 상태" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ReadingStatus).map((status) => (
                    <SelectItem
                      key={status}
                      value={status}
                    >
                      {readingStatusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          ></Controller>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Controller
              control={control}
              name="startDate"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Label htmlFor="startDate">읽기 시작한 날짜</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>날짜 선택</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        initialFocus
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </>
              )}
            ></Controller>
          </div>
          <div className="space-y-2">
            <Controller
              control={control}
              name="endDate"
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <Label htmlFor="endDate">읽은 마지막 날짜</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>날짜 선택</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        initialFocus
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </>
              )}
            ></Controller>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
