'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Switch } from '@/shared/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import StarRating from './star-rating';

const readingStatuses = [
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'read', label: 'Read' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'dropped', label: 'Dropped' },
];

const steps = ['book-info', 'rating', 'review', 'quotes', 'visibility'];

const formData = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  publisher: 'Scribner',
  isbn: '9780743273565',
  coverUrl: '/placeholder.svg?height=400&width=300',
  description:
    "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
  pageCount: 180,
  readingStatus: 'read',
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

  return (
    <form className="mx-auto w-full max-w-4xl space-y-8 p-4 md:p-6">
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{formData.title}</CardTitle>
            <CardDescription>by {formData.author}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
              <div className="space-y-2">
                <p>
                  <strong>Publisher:</strong> {formData.publisher}
                </p>
                <p>
                  <strong>ISBN:</strong> {formData.isbn}
                </p>
                <p>
                  <strong>Pages:</strong> {formData.pageCount}
                </p>
              </div>
            </div>
            <div>
              <strong>Description:</strong>
              <p className="mt-2">{formData.description}</p>
            </div>
            <div className="space-y-2">
              <Label>Reading Status</Label>
              <RadioGroup value={formData.readingStatus}>
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
      )}

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Rating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Do you recommend this book?</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={formData.recommended === true ? 'default' : 'outline'}
                >
                  <ThumbsUp className="mr-2 size-5" />
                  Recommend
                </Button>
                <Button
                  type="button"
                  variant={formData.recommended === false ? 'default' : 'outline'}
                >
                  <ThumbsDown className="mr-2 size-5" />
                  Don&apos;t Recommend
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Overall Rating</Label>
              <StarRating rating={formData.overallRating} />
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              className="min-h-[200px]"
              placeholder="Write your review here... (Markdown supported)"
            />
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Memorable Quotes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.quotes.map((quote: { text: string; page: string }, index: number) => (
              <div
                key={index}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor={`quote-${index}`}>Quote {index + 1}</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
                <Textarea
                  id={`quote-${index}`}
                  value={quote.text}
                  placeholder="Enter a memorable quote"
                />
                <Input
                  type="number"
                  value={quote.page}
                  placeholder="Page number"
                  className="w-32"
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
            >
              Add Another Quote
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="visibility"
                checked={formData.visibility}
              />
              <Label htmlFor="visibility">Make review public</Label>
            </div>
          </CardContent>
        </Card>
      )}

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
