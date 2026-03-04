import { type HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';

type InputVariant = 'default';

interface Props extends HTMLMotionProps<'input'> {
  variant?: InputVariant;
}

export default function Input({ className, ...props }: Props) {
  return (
    <motion.input
      className={cn('bg-card rounded-2xl p-3 outline-none', className)}
      whileFocus={{ boxShadow: '0px 0px 5px 1px var(--secondary)' }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      {...props}
    />
  );
}
