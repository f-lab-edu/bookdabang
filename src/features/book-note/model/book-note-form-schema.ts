import { z } from 'zod';
import { ReadingStatus } from './reading-status';

export const quoteSchema = z.object({
  text: z.string(),
  page: z.string(),
});

export type QuoteSchema = z.infer<typeof quoteSchema>;

export const bookNoteFormSchema = z.object({
  readingStatus: z.nativeEnum(ReadingStatus, {
    required_error: '읽기 상태는 필수 값입니다.',
  }),
  startDate: z.date({
    required_error: '읽기 시작한 날짜는 필수 값입니다.',
  }),
  endDate: z.date({
    required_error: '읽은 마지막 날짜는 필수 값입니다.',
  }),
  recommended: z.boolean().nullable(),
  overallRating: z.number(),
  content: z.string(),
  quotes: z.array(quoteSchema),
  visibility: z.boolean(),
});

export type BookNoteFormSchema = z.infer<typeof bookNoteFormSchema>;
