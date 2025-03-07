import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { BookNoteFormValues } from '../../../../model/book-note-form-values';
import { ReadingStatus } from '../../../../model/reading-status';

const readingStatusLabels = {
  [ReadingStatus.WANT_TO_READ]: '읽고 싶어요',
  [ReadingStatus.READING]: '읽고 있어요',
  [ReadingStatus.READ]: '읽었어요',
  [ReadingStatus.ON_HOLD]: '보류 중이에요',
  [ReadingStatus.DROPPED]: '포기했어요',
} as const;

export default function ReadingInfoSelect() {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookNoteFormValues>();

  return (
    <div className="space-y-2">
      <Label>읽기 상태</Label>
      <Controller
        control={control}
        name="readingStatus"
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="읽기 상태" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ReadingStatus).map((status) => (
                <SelectItem
                  key={status}
                  value={status}
                >
                  {readingStatusLabels[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      ></Controller>
      {errors.readingStatus && <p className="text-red-500">읽기 상태는 필수 값입니다.</p>}
    </div>
  );
}
