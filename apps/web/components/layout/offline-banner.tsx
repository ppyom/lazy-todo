'use client';

import { AnimatePresence, motion } from 'motion/react';

import { useOnlineStatus } from '@/hooks/use-online-status';

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          className="w-full bg-secondary/20 text-foreground text-xs text-center py-1.5 relative z-0"
          initial={{ translateY: -16 }}
          animate={{ translateY: 0 }}
          exit={{ translateY: -16 }}
        >
          오프라인 상태예요. 일부 기능을 사용할 수 없어요.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
