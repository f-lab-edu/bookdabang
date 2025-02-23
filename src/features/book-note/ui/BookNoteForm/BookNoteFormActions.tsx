import { Button } from '@/shared/ui/button';

interface BookNoteFormActionsProps {
  previousLabel?: string;
  nextLabel?: string;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function BookNoteFormActions({
  previousLabel = '이전',
  nextLabel = '다음',
  previousDisabled,
  nextDisabled,
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
      <Button
        type="button"
        disabled={nextDisabled}
        onClick={onNext}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
