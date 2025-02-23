import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import BookNoteFormActions from '../BookNoteFormActions';

interface ReviewStepProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ReviewStep({ onPrevious, onNext }: ReviewStepProps) {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>독후감</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="content"
            name="content"
            className="min-h-[200px]"
            placeholder="독후감을 작성해 보세요!"
          />
        </CardContent>
      </Card>
      <BookNoteFormActions
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </form>
  );
}
