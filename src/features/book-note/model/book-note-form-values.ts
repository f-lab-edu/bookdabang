import { ReadingStatus } from './reading-status';

export interface BookNoteFormValues {
  readingStatus: ReadingStatus;
  startDate: Date;
  endDate: Date;
  recommended: boolean | null;
  overallRating: number;
  content: string;
  quotes: { text: string; page: string }[];
  visibility: boolean;
}
