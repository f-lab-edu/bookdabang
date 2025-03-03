import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { BookNoteFormValues } from '../../../model/book-note-form-values';

export default function VisibilityStep() {
  const { control } = useFormContext<BookNoteFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>노트 공개 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="visibility"
            render={({ field }) => (
              <Switch
                id="visibility"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          ></Controller>
          <Label htmlFor="visibility">전체 공개</Label>
        </div>
      </CardContent>
    </Card>
  );
}
