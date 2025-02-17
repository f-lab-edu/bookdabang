export const BookListTab = {
  NEW: 'new',
  BESTSELLER: 'bestseller',
} as const;

export type BookListTab = (typeof BookListTab)[keyof typeof BookListTab];
