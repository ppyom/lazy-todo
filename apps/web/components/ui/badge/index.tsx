import { cn } from '@/lib/utils/cn';

type BadgeSize = 'base' | 'sm';
type BadgeVariant = 'default' | 'secondary' | 'accent';

interface Props {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export default function Badge({
  text,
  variant = 'default',
  size = 'base',
}: Props) {
  return (
    <span
      className={cn(
        'rounded-2xl p-2 inline-block transition-all',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        variant === 'accent' && 'bg-foreground text-background',
        size === 'base' && 'text-sm',
        size === 'sm' && 'py-1 text-xs',
      )}
    >
      {text}
    </span>
  );
}
