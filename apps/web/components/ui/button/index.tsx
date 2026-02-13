import { HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'default' | 'secondary' | 'accent';

interface Props extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  className,
  variant = 'default',
  type = 'button',
  ...props
}: Props) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      className={cn(
        'p-3 rounded-2xl cursor-pointer',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'accent' && 'bg-foreground text-background',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
