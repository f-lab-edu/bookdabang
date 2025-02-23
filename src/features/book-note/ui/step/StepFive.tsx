import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { BookNoteFormValues } from '../../model/book-note-form-values';

interface StepFiveProps {
  formData: BookNoteFormValues;
}

export default function StepFive({ formData }: StepFiveProps) {
  return (
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
  );
}
