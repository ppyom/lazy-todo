'use client';

import { AnimatePresence, motion } from 'motion/react';

import { defferReasonMap, getEmojiLabel, statusMap } from '@/lib/todo';
import { Badge, Checkbox } from '@/components/ui';
import type { Todo } from '@/types/todo';

import CleanupAction from './cleanup-action';
import DeferAction from './defer-action';
import DeleteAction from './delete-action';

interface Props {
  todo: Todo;
  showBadge?: boolean;

  onStatusChange?: (id: string, status: Todo['status']) => void;
  onDefer?: (id: string, reason: Todo['deferReason']) => void;
  onCleanup?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function TodoItem({
  todo,
  showBadge,
  onStatusChange,
  onDefer,
  onCleanup,
  onDelete,
}: Props) {
  const { id, content, status, deferReason } = todo;
  const isCompleted = status === 'COMPLETED';

  return (
    <motion.div
      className="flex items-center gap-4 bg-card p-4 rounded-2xl overflow-hidden"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: -20, // 왼쪽으로 살짝 밀리면서
        height: 0, // 높이가 0이 되어 아래 아이템들이 슥 올라오게 함
        marginTop: 0, // 간격 조절
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        transition: {
          opacity: { duration: 0.2 },
          height: { duration: 0.3, delay: 0.1 }, // 높이는 살짝 나중에 줄어들어야 자연스러움
          x: { duration: 0.2 },
        },
      }}
    >
      <Checkbox
        checked={isCompleted}
        onChange={() =>
          onStatusChange?.(id, isCompleted ? 'IN_PROGRESS' : 'COMPLETED')
        }
      />
      <div className="flex-1 space-y-2">
        <div className="relative w-fit max-w-full">
          <motion.p
            animate={{
              color: isCompleted
                ? 'var(--muted-foreground)'
                : 'var(--foreground)',
              opacity: isCompleted ? 0.6 : 1,
            }}
          >
            {content}
          </motion.p>
          <motion.span
            className="absolute left-0 top-1/2 h-px bg-muted-foreground origin-left pointer-events-none"
            initial={{ width: '0%' }}
            animate={{ width: isCompleted ? '100%' : '0%' }}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: 'easeOut',
            }}
          />
        </div>
        {showBadge && (
          <div className="space-x-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`status-${status}`} // 상태가 바뀔 때마다 다시 렌더링
                className="inline-block"
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              >
                <Badge
                  text={getEmojiLabel(statusMap[status])}
                  size="sm"
                  variant="accent"
                />
              </motion.div>
              {deferReason && (
                <motion.div
                  key={`reason-${deferReason}`}
                  className="inline-block"
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ duration: 0.1, ease: 'easeInOut' }}
                >
                  <Badge
                    text={getEmojiLabel(defferReasonMap[deferReason])}
                    size="sm"
                    variant="secondary"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {!isCompleted && (
          <motion.div
            key="actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: 16,
              transition: { duration: 0.2, ease: 'easeIn' },
            }}
          >
            {status === 'IN_PROGRESS' && (
              <DeferAction onReason={(reason) => onDefer?.(id, reason)} />
            )}
            {status === 'DEFERRED' && (
              <CleanupAction
                onConfirm={(confirmed) => confirmed && onCleanup?.(id)}
              />
            )}
            {status === 'ARCHIVED' && (
              <DeleteAction onDelete={() => onDelete?.(id)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
