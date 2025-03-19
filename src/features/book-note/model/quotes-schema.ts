import { z } from 'zod';
import { isEmpty } from '@/shared/lib/string-utils';

const quoteSchema = z.object({
  text: z.string().trim().min(1, {
    message: '기억에 남는 문구는 필수 값입니다.',
  }),
  page: z.string(),
});

export function createQuoteSchema(pageCount: number) {
  return z
    .array(quoteSchema)
    .min(1, {
      message: '기억에 남는 문구는 최소 하나 이상 입력해야 합니다.',
    })
    .superRefine((data, ctx) => {
      if (data.length < 2) return;

      for (const [index, quote] of data.entries()) {
        if (isEmpty(quote.page)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '페이지를 입력해 주세요.',
            path: [index, 'page'],
          });
        }
      }
    })
    .superRefine((data, ctx) => {
      for (const [index, quote] of data.entries()) {
        if (Number(quote.page) > pageCount) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `페이지는 최대 ${pageCount}쪽까지 입력할 수 있습니다.`,
            path: [index, 'page'],
          });
        }
      }
    });
}
