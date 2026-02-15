'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';
import {
  useEscapeKey,
  useFocusBoundary,
  useFocusRestore,
  useScrollLock,
} from '@/hooks/accessibility';
import { useMounted } from '@/hooks/use-mounted';

import { ModalAnimations, type ModalAnimationType } from './animation';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?: ModalAnimationType;
}

export default function Modal({
  open,
  onClose,
  children,
  animation = 'base',
}: Props) {
  const isMounted = useMounted();
  const modalRef = useFocusBoundary<HTMLDivElement>(open);

  useScrollLock(open);
  useEscapeKey(onClose, open);
  useFocusRestore(open);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            variants={ModalAnimations.dissolve}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* Content */}
          <motion.div
            ref={modalRef}
            className={cn(
              'relative z-10',
              'bg-card rounded-2xl p-4 w-full max-w-sm mx-4',
            )}
            variants={ModalAnimations[animation]}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
