import { isNil, isNotNil } from 'es-toolkit';
import { z } from 'zod';
import { ReadingStatus } from './reading-status';

interface ValidationRule {
  required?: boolean;
  message: string;
}

const validationRules: Partial<Record<ReadingStatus, Record<'startDate' | 'endDate', ValidationRule>>> = {
  [ReadingStatus.WANT_TO_READ]: {
    startDate: {
      required: false,
      message: '읽고 싶은 책은 독서 기간이 입력되지 않아야 합니다.',
    },
    endDate: {
      required: false,
      message: '읽고 싶은 책은 독서 기간이 입력되지 않아야 합니다.',
    },
  },
  [ReadingStatus.READING]: {
    startDate: {
      required: true,
      message: '읽고 있는 책은 시작 날짜가 입력되어야 합니다.',
    },
    endDate: {
      required: false,
      message: '읽고 있는 책은 종료 날짜가 입력되지 않아야 합니다.',
    },
  },
  [ReadingStatus.READ]: {
    startDate: {
      required: true,
      message: '읽은 책은 시작 날짜가 입력되어야 합니다.',
    },
    endDate: {
      required: true,
      message: '읽은 책은 종료 날짜가 입력되어야 합니다.',
    },
  },
  [ReadingStatus.ON_HOLD]: {
    startDate: {
      required: true,
      message: '보류 중인 책은 시작 날짜가 입력되어야 합니다.',
    },
    endDate: {
      required: false,
      message: '보류 중인 책은 종료 날짜가 입력되지 않아야 합니다.',
    },
  },
};

export const readingInfoSchema = z
  .object({
    readingStatus: z.nativeEnum(ReadingStatus, {
      required_error: '읽기 상태는 필수 값입니다.',
    }),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    const rules = validationRules[data.readingStatus];
    if (isNil(rules)) return;

    const validateDateField = (field: 'startDate' | 'endDate') => {
      const rule = rules[field];
      if (isNil(rule.required)) return;

      const value = data[field];
      const hasValue = isNotNil(value);

      if (rule.required !== hasValue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: rule.message,
          path: [field],
        });
      }
    };

    validateDateField('startDate');
    validateDateField('endDate');
  });
