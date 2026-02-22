import type { MapDetail } from '@/types/common';
import { ReviewEmoji } from '@/types/review';

export const reviewEmojiMap: Record<ReviewEmoji, MapDetail> = {
  [ReviewEmoji.HAPPY]: { label: '행복', emoji: '😄' },
  [ReviewEmoji.NORMAL]: { label: '무난', emoji: '🙂' },
  [ReviewEmoji.TIRED]: { label: '지침', emoji: '😴' },
  [ReviewEmoji.THINKING]: { label: '고민', emoji: '🤔' },
  [ReviewEmoji.SAD]: { label: '슬픔', emoji: '😢' },
  [ReviewEmoji.ANNOYED]: { label: '짜증', emoji: '💢' },
  [ReviewEmoji.SURPRISED]: { label: '놀람', emoji: '😲' },
  [ReviewEmoji.MELTED]: { label: '녹음', emoji: '🫠' },
  [ReviewEmoji.FLOW]: { label: '흘러가는대로', emoji: '🌊' },
  [ReviewEmoji.SPARKLE]: { label: '반짝', emoji: '✨' },
};
