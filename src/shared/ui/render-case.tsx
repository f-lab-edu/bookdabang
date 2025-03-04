import { ReactNode } from 'react';

export interface RenderCaseProps<T extends string | number | symbol> {
  value: T;
  cases: Record<T, ReactNode>;
}

export function RenderCase<T extends string | number | symbol>({ value, cases }: RenderCaseProps<T>) {
  return cases[value];
}
