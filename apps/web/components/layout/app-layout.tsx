import { cn } from '@/lib/utils/cn';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto max-w-4xl h-full flex flex-col bg-background',
        className,
      )}
    >
      {children}
    </div>
  );
}
