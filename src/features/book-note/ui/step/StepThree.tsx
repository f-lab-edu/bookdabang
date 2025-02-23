import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { BookNoteFormValues } from '../../model/book-note-form-values';

interface StepThreeProps {
  formData: BookNoteFormValues;
}

export default function StepThree({ formData }: StepThreeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          id="content"
          name="content"
          defaultValue={formData.content}
          className="min-h-[200px]"
          placeholder="Write your review here... (Markdown supported)"
        />
      </CardContent>
    </Card>
  );
}
