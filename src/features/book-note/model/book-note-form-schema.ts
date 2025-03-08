import { z } from 'zod';
import { ReadingStatus } from './reading-status';

export const quoteSchema = z.object({
  text: z.string(),
  page: z.string(),
});

export type QuoteSchema = z.infer<typeof quoteSchema>;

export const bookNoteFormSchema = z.object({
  readingStatus: z.nativeEnum(ReadingStatus),
  startDate: z.date(),
  endDate: z.date(),
  recommended: z.boolean().nullable(),
  overallRating: z.number(),
  content: z.string(),
  quotes: z.array(quoteSchema),
  visibility: z.boolean(),
});

export type BookNoteFormSchema = z.infer<typeof bookNoteFormSchema>;
