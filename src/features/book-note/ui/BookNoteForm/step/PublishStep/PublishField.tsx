import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';
import { BookNoteFormSchema } from '../../../../model/book-note-form-schema';

export default function PublishField() {
  const { control } = useFormContext<BookNoteFormSchema>();

  return (
    <div className="flex items-center space-x-2">
      <Controller
        control={control}
        name="publish"
        render={({ field }) => (
          <Switch
            id="publish"
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <Label htmlFor="publish">전체 공개</Label>
    </div>
  );
}
