import { CoffeeIcon, SearchXIcon } from 'lucide-react';

import { statusMap } from '@/lib/todo';
import { Button, EmptyState } from '@/components/ui';
import type { TodoStatus } from '@/types/todo';

interface Props {
  searchQuery?: string | null;
  selectedStatus?: TodoStatus | null;
  onClear?: () => void;
}

export default function TodoEmptyState({
  searchQuery,
  selectedStatus,
  onClear,
}: Props) {
  const isFiltering = !!searchQuery || !!selectedStatus;

  if (isFiltering) {
    const statusLabel = selectedStatus ? statusMap[selectedStatus].label : '';
    const displayKeyword = searchQuery || statusLabel;

    return (
      <EmptyState
        icon={<SearchXIcon size={40} />}
        title="검색 결과가 없어요"
        description={`"${displayKeyword}"에 해당하는 할 일을 찾을 수 없습니다.`}
        action={
          <Button className="text-sm" variant="accent" onClick={onClear}>
            필터 초기화하기
          </Button>
        }
      />
    );
  }

  return (
    <EmptyState
      icon={<CoffeeIcon size={40} />}
      title="모든 일을 끝냈나요?"
      description="남은 할 일이 없습니다. 여유로운 시간을 즐겨보세요!"
    />
  );
}
