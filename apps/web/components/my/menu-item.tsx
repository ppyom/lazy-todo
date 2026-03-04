import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import MenuLabel from './menu-label';

type BaseProps = {
  label: string;
  description?: string;
  className?: string;
  disabled?: boolean;
};

type ButtonProps = BaseProps & { onClick: () => void; href?: undefined };
type LinkProps = BaseProps & { href: string; onClick?: undefined };
type StaticProps = BaseProps & { href?: undefined; onClick?: undefined };

type Props = ButtonProps | LinkProps | StaticProps;

export default function MenuItem({
  label,
  description,
  className,
  disabled,
  href,
  onClick,
}: Props) {
  const sharedClassName = cn(
    'w-full flex items-center justify-between px-4 py-3 gap-4',
    disabled && 'opacity-50 pointer-events-none',
    className,
  );

  const chevron = (
    <ChevronRightIcon size={16} className="text-muted-foreground shrink-0" />
  );

  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={cn(
          'hover:bg-secondary/50 transition-colors cursor-pointer',
          sharedClassName,
        )}
      >
        <MenuLabel label={label} description={description} />
        {chevron}
      </Link>
    );
  }

  if (onClick !== undefined) {
    return (
      <button
        className={cn(
          sharedClassName,
          'hover:bg-secondary/50 transition-colors cursor-pointer',
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <MenuLabel label={label} description={description} />
        {chevron}
      </button>
    );
  }

  return (
    <div className={sharedClassName}>
      <MenuLabel label={label} description={description} />
    </div>
  );
}
