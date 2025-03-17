import { z } from 'zod';

const quoteSchema = z.object({
  text: z.string().trim().min(1, {
    message: '기억에 남는 문구는 필수 값입니다.',
  }),
  page: z.string().trim().min(1, {
    message: '페이지 번호는 필수 값입니다.',
  }),
});

export const quotesSchema = z.array(quoteSchema).min(1, {
  message: '기억에 남는 문구는 최소 하나 이상 입력해야 합니다.',
});
