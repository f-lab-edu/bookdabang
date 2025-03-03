import { Button } from '@/shared/ui/button';

interface BookNoteFormActionsProps {
  previousLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  showSubmit?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function BookNoteFormActions({
  previousLabel = '이전',
  nextLabel = '다음',
  submitLabel = '저장',
  previousDisabled,
  nextDisabled,
  showSubmit,
  onPrevious,
  onNext,
}: BookNoteFormActionsProps) {
  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        onClick={onPrevious}
        variant="outline"
        disabled={previousDisabled}
      >
        {previousLabel}
      </Button>
      {showSubmit ? (
        <Button type="submit">{submitLabel}</Button>
      ) : (
        <Button
          type="button"
          disabled={nextDisabled}
          onClick={onNext}
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
