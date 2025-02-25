export const BookNoteFormStep = {
  READING_INFO: 'READING_INFO',
  RATING: 'RATING',
  REVIEW: 'REVIEW',
  QUOTES: 'QUOTES',
  VISIBILITY: 'VISIBILITY',
} as const;

export type BookNoteFormStep = (typeof BookNoteFormStep)[keyof typeof BookNoteFormStep];
