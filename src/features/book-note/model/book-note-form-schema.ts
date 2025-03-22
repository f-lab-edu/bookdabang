import { z } from 'zod';
import { requiredNullable } from '@/shared/lib/zod-utils';
import { readingInfoSchema } from './reading-info-schema';
import { createQuoteSchema } from './quotes-schema';

export function createBookNoteFormSchema(pageCount: number) {
  return z.object({
    readingInfo: readingInfoSchema,
    recommended: requiredNullable(z.boolean(), '추천 여부는 필수 값입니다.'),
    rating: requiredNullable(z.number(), '전체 평점은 필수 값입니다.'),
    review: z.string().min(1, {
      message: '독후감은 필수 값입니다.',
    }),
    quotes: createQuoteSchema(pageCount),
    publish: z.boolean(),
  });
}

export type BookNoteFormSchema = z.infer<ReturnType<typeof createBookNoteFormSchema>>;
