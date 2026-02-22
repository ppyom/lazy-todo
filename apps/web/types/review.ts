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

export interface Review {
  id: string;
  emoji: ReviewEmoji;
  comment?: string;
  createdAt: Date;
  updatedAt?: Date;
}
