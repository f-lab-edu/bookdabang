import { ReadingStatus } from './reading-status';

export interface Quote {
  text: string;
  page: string;
}

export interface BookNoteFormValues {
  readingStatus: ReadingStatus;
  startDate: Date;
  endDate: Date;
  recommended: boolean | null;
  overallRating: number;
  content: string;
  quotes: Quote[];
  visibility: boolean;
}
