import type { Variants } from 'motion';

export type ModalAnimationType = 'base' | 'dissolve' | 'slide';

const baseVariant: Variants = {
  initial: { scale: 0.75, translateY: '100%' },
  animate: { scale: 1, translateY: 0 },
  exit: { scale: 0, translateY: '80%' },
};

const dissolveVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideVariant: Variants = {
  initial: { translateX: '100%' },
  animate: { translateX: 0 },
  exit: { scale: 0, translateY: '100%' },
};

export const ModalAnimations: Record<ModalAnimationType, Variants> = {
  base: baseVariant,
  dissolve: dissolveVariant,
  slide: slideVariant,
} as const;
