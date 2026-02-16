'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button, Input } from '@/components/ui';

interface Props {
  onAdd: (content: string) => void;
}

export default function NewTodoInput({ onAdd }: Props) {
  const [content, setContent] = useState('');

  const handleCreateNewTodo = () => {
    if (!content.trim()) return;

    onAdd(content);
    setContent('');
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCreateNewTodo();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        className="flex-1 min-w-0"
        placeholder="할 일 추가"
        value={content}
        onChange={({ target }) => setContent(target.value)}
        onKeyDown={handleEnterKeyDown}
      />
      <Button onClick={handleCreateNewTodo}>
        <PlusIcon />
      </Button>
    </div>
  );
}
