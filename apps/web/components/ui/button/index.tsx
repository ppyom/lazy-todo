import { Slot } from '@radix-ui/react-slot';
import { HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'default' | 'secondary' | 'accent';

interface Props extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  asChild?: boolean;
}

const MotionSlot = motion.create(Slot);

export default function Button({
  children,
  className,
  variant = 'default',
  asChild,
  ...props
}: Props) {
  const Component = asChild ? MotionSlot : motion.button;

  return (
    <Component
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      className={cn(
        'p-3 rounded-2xl cursor-pointer text-center',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'accent' && 'bg-foreground text-background',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
