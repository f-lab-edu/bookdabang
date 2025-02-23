import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { BookDetail } from '@/entities/book';
import { BookNoteFormValues } from '../../model/book-note-form-values';

const readingStatuses = [
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'read', label: 'Read' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'dropped', label: 'Dropped' },
];

interface StepOneProps {
  book: BookDetail;
  formData: BookNoteFormValues;
}

export default function StepOne({ book, formData }: StepOneProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="space-y-2">
            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Pages:</strong> {book.pageCount}
            </p>
          </div>
        </div>
        <div>
          <strong>Description:</strong>
          <p className="mt-2">{book.description}</p>
        </div>
        <div className="space-y-2">
          <Label>Reading Status</Label>
          <RadioGroup defaultValue={formData.readingStatus}>
            {readingStatuses.map((status) => (
              <div
                key={status.value}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={status.value}
                  id={status.value}
                />
                <Label htmlFor={status.value}>{status.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={`w-full justify-start text-left font-normal ${!formData.startDate && 'text-muted-foreground'}`}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {formData.startDate ? format(formData.startDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={`w-full justify-start text-left font-normal ${!formData.endDate && 'text-muted-foreground'}`}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {formData.endDate ? format(formData.endDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
