import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { BookNoteFormValues } from '../../model/book-note-form-values';
import StarRating from '../star-rating';

interface StepTwoProps {
  formData: BookNoteFormValues;
}

export default function StepTwo({ formData }: StepTwoProps) {
  return (
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
  );
}
