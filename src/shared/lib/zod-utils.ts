import { isNull } from 'es-toolkit';
import { z } from 'zod';

export function requiredNullable<T extends z.ZodTypeAny>(schema: T, message: string): z.ZodType<z.infer<T> | null> {
  return schema.nullable().superRefine((val, ctx) => {
    if (isNull(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
      });
    }
  });
}
