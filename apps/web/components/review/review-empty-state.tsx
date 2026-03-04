import { PenLineIcon } from 'lucide-react';

import { EmptyState } from '@/components/ui';

export default function ReviewEmptyState() {
  return (
    <EmptyState
      icon={<PenLineIcon size={40} />}
      title="어떤 하루였나요?"
      description="첫 번째 기록을 기다리고있어요!"
    />
  );
}
