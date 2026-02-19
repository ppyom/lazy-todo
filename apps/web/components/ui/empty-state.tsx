'use client';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';

interface Props {
  title: string;
  description?: string;
  icon?: React.ReactNode | string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: Props) {
  return (
    <motion.div
      className={cn(
        'flex flex-col gap-4 items-center justify-center py-16 px-4',
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {icon && (
        <div className="size-20 text-4xl flex items-center justify-center rounded-full bg-secondary/30 text-muted-foreground">
          {icon}
        </div>
      )}
      <p className="font-bold text-lg">{title}</p>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {action}
    </motion.div>
  );
}
