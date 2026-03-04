import { cn } from '@/lib/utils/cn';

interface Props {
  className?: string;
}

export default function Skeleton({ className }: Props) {
  return (
    <div
      className={cn('rounded-2xl bg-secondary/50 animate-pulse', className)}
    />
  );
}
