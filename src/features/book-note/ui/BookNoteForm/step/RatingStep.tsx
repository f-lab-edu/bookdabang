import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import BookNoteFormActions from '../BookNoteFormActions';
import StarRating from '../StarRating';

interface RatingStepProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

const recommended = true;

export default function RatingStep({ onPrevious, onNext }: RatingStepProps) {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>책 평가</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>이 책을 추천할까요?</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={recommended ? 'default' : 'outline'}
              >
                <ThumbsUp className="mr-2 size-5" />
                추천
              </Button>
              <Button
                type="button"
                variant={!recommended ? 'default' : 'outline'}
              >
                <ThumbsDown className="mr-2 size-5" />
                추천하지 않음
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>전체 평점</Label>
            <StarRating rating={3} />
          </div>
        </CardContent>
      </Card>
      <BookNoteFormActions
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </form>
  );
}
