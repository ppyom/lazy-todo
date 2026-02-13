import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

interface Props {
  title: string;
  content: string;
  icon?: LucideIcon;
  className?: string;
}

export default function Alert({
  title,
  content,
  icon: Icon,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex gap-2 p-4',
        'border-2 border-secondary bg-secondary/50 rounded-2xl',
        className,
      )}
    >
      {Icon && <Icon className="mt-1" size={16} />}
      <div className="space-y-2">
        <p className="font-bold">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}
