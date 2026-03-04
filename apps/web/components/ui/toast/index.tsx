'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';
import { useMounted } from '@/hooks/use-mounted';

export type ToastVariant = 'success' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface Props {
  toasts: ToastItem[];
}

export default function Toast({ toasts }: Props) {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed bottom-24 inset-x-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={cn(
              'px-4 py-3 rounded-2xl text-sm font-medium shadow-md pointer-events-auto',
              toast.variant === 'success' && 'bg-foreground text-background',
              toast.variant === 'error' && 'bg-primary text-primary-foreground',
            )}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 360, damping: 24 }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
