export const ReadingStatus = {
  WANT_TO_READ: 'WANT_TO_READ',
  READING: 'READING',
  READ: 'READ',
  ON_HOLD: 'ON_HOLD',
  DROPPED: 'DROPPED',
} as const;

export type ReadingStatus = (typeof ReadingStatus)[keyof typeof ReadingStatus];
