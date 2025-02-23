import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormValues } from '../../model/book-note-form-values';

interface StepFourProps {
  formData: BookNoteFormValues;
}

export default function StepFour({ formData }: StepFourProps) {
  return (
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
              defaultValue={quote.text}
              placeholder="Enter a memorable quote"
            />
            <Input
              type="number"
              defaultValue={quote.page}
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
  );
}
