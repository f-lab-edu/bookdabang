export interface BookNoteFormValues {
  readingStatus: string;
  startDate: Date;
  endDate: Date;
  recommended: boolean | null;
  overallRating: number;
  content: string;
  quotes: { text: string; page: string }[];
  visibility: boolean;
}
