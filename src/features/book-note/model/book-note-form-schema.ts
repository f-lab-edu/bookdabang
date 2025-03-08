import { z } from 'zod';
import { ReadingStatus } from './reading-status';

export const quoteSchema = z.object({
  text: z.string().trim().min(1, {
    message: '기억에 남는 문구는 필수 값입니다.',
  }),
  page: z.string().trim().min(1, {
    message: '페이지 번호는 필수 값입니다.',
  }),
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
  recommended: z.boolean({
    required_error: '추천 여부는 필수 값입니다.',
  }),
  overallRating: z.number({
    required_error: '전체 평점은 필수 값입니다.',
  }),
  content: z.string().min(1, {
    message: '독후감은 필수 값입니다.',
  }),
  quotes: z.array(quoteSchema).min(1, {
    message: '기억에 남는 문구는 최소 하나 이상 입력해야 합니다.',
  }),
  visibility: z.boolean(),
});

export type BookNoteFormSchema = z.infer<typeof bookNoteFormSchema>;
