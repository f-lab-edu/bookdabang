import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useThrottle } from '@toss/react';
import { BookNoteFormSchema } from './book-note-form-schema';

const THROTTLE_DELAY_MS = 500;

export function useBookNotePreview({ getValues, watch }: UseFormReturn<BookNoteFormSchema>) {
  const [previewData, setPreviewData] = useState<BookNoteFormSchema>(getValues());

  const updatePreviewDataWithDelay = useThrottle((value: BookNoteFormSchema) => {
    setPreviewData(value);
  }, THROTTLE_DELAY_MS);

  useEffect(() => {
    const { unsubscribe } = watch((value) => updatePreviewDataWithDelay(value as BookNoteFormSchema));
    return () => unsubscribe();
  }, [watch, updatePreviewDataWithDelay]);

  return previewData;
}
