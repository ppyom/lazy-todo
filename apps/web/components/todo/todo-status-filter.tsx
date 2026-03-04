'use client';

import { getEmojiLabel, statusMap } from '@/lib/todo';
import { Button } from '@/components/ui';
import { TodoStatus } from '@/types/todo';

interface Props {
  selectedStatus: TodoStatus | null;
  onStatusChange: (status?: TodoStatus) => void;
}

export default function TodoStatusFilter({
  selectedStatus,
  onStatusChange,
}: Props) {
  return (
    <div className="space-x-1">
      {[
        TodoStatus.IN_PROGRESS,
        TodoStatus.DEFERRED,
        TodoStatus.ARCHIVED,
        TodoStatus.COMPLETED,
      ].map((status) => (
        <Button
          key={status}
          onClick={() =>
            onStatusChange(status === selectedStatus ? undefined : status)
          }
          variant={selectedStatus === status ? 'accent' : 'secondary'}
          className="text-sm leading-2"
        >
          {getEmojiLabel(statusMap[status])}
        </Button>
      ))}
    </div>
  );
}
