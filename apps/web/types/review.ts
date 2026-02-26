import { review } from '@/db/local/schema';

export enum ReviewEmoji {
  HAPPY = 'HAPPY',
  NORMAL = 'NORMAL',
  TIRED = 'TIRED',
  THINKING = 'THINKING',
  SAD = 'SAD',
  SURPRISED = 'SURPRISED',
  MELTED = 'MELTED',
  FLOW = 'FLOW',
  SPARKLE = 'SPARKLE',
  ANNOYED = 'ANNOYED',
}

export type Review = typeof review.$inferSelect;
