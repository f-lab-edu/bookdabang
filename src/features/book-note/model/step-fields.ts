import { BookNoteFormSchema } from './book-note-form-schema';

export const stepFields = new Map<number, (keyof BookNoteFormSchema)[]>([
  [1, ['readingInfo']],
  [2, ['recommended', 'rating']],
  [3, ['review']],
  [4, ['quotes']],
  [5, ['publish']],
]);
