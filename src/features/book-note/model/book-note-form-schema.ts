import { z } from 'zod';
import { readingInfoSchema } from './reading-info-schema';

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
  readingInfo: readingInfoSchema,
  recommended: z.boolean({
    required_error: '추천 여부는 필수 값입니다.',
  }),
  rating: z.number({
    required_error: '전체 평점은 필수 값입니다.',
  }),
  review: z.string().min(1, {
    message: '독후감은 필수 값입니다.',
  }),
  quotes: z.array(quoteSchema).min(1, {
    message: '기억에 남는 문구는 최소 하나 이상 입력해야 합니다.',
  }),
  visibility: z.boolean(),
});

export type BookNoteFormSchema = z.infer<typeof bookNoteFormSchema>;
