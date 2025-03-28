import { useFormContext } from 'react-hook-form';
import { useFunnelContext } from '@/shared/lib/funnel';
import { Button } from '@/shared/ui/button';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';

const triggerFields: Record<number, (keyof BookNoteFormSchema)[]> = {
  1: ['readingInfo'],
  2: ['recommended', 'rating'],
  3: ['review'],
  4: ['quotes'],
  5: ['publish'],
};

interface BookNoteFormActionsProps {
  previousLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
}

export default function BookNoteFormActions({
  previousLabel = '이전',
  nextLabel = '다음',
  submitLabel = '저장',
}: BookNoteFormActionsProps) {
  const { trigger } = useFormContext<BookNoteFormSchema>();
  const { currentStep, isFirstStep, isLastStep, goToPreviousStep, goToNextStep } = useFunnelContext();

  const handleNext = async () => {
    const isValid = await trigger(triggerFields[currentStep], { shouldFocus: true });
    if (isValid) goToNextStep();
  };

  return (
    <div className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        disabled={isFirstStep}
        onClick={goToPreviousStep}
      >
        {previousLabel}
      </Button>
      {isLastStep ? (
        <Button type="submit">{submitLabel}</Button>
      ) : (
        <Button
          type="button"
          onClick={handleNext}
        >
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
