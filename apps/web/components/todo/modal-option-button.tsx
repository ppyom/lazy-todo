'use client';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';

interface Props {
  emoji: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export default function ModalOptionButton({
  emoji,
  label,
  onClick,
  active,
}: Props) {
  return (
    <motion.button
      className={cn(
        'block bg-card rounded-2xl p-4 w-full text-left space-x-2',
        active && 'bg-primary text-primary-foreground',
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      onClick={onClick}
    >
      <motion.span
        className="inline-block"
        initial={{ y: 0 }}
        animate={active ? { y: [-4, 0] } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 12 }}
      >
        {emoji}
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
}
