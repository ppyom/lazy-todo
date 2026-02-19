'use client';

import { useEffect, useRef, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { Button, Input } from '@/components/ui';

interface Props {
  defaultValue?: string;
  onSearch: (keyword: string) => void;
}

export default function SearchTodoInput({ defaultValue, onSearch }: Props) {
  const timerRef = useRef<NodeJS.Timeout>(null);
  const [keyword, setKeyword] = useState(defaultValue || '');

  const executeSearch = (value: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onSearch(value);
  };
  const handleImmediateSearch = () => {
    executeSearch(keyword);
  };
  const handleEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleImmediateSearch();
    }
  };
  const handleReset = () => {
    setKeyword('');
    executeSearch('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(keyword);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword, onSearch]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Input
          className="w-full min-w-0 pr-10"
          placeholder="할 일 검색"
          value={keyword}
          onChange={({ target }) => setKeyword(target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        {keyword && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={handleReset}
          >
            <XIcon size={16} />
          </button>
        )}
      </div>
      <Button variant="accent" onClick={handleImmediateSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
}
