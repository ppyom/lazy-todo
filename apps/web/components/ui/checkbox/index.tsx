import { motion } from 'motion/react';

import { cn } from '@/lib/utils/cn';

interface Props {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
}

export default function Checkbox({ checked, onChange, id, name }: Props) {
  return (
    <label>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={({ target }) => onChange?.(target.checked)}
        {...{ id: id, name: name }}
      />
      <motion.div
        className={cn(
          'size-6 border-2 border-secondary rounded-lg flex items-center justify-center transition-colors',
          checked ? 'bg-secondary' : 'bg-secondary/10',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 stroke-foreground stroke-3"
        >
          <motion.path
            d="M4 12L9 17L20 6"
            initial={false}
            animate={{
              pathLength: checked ? 1 : 0,
              opacity: checked ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </svg>
      </motion.div>
    </label>
  );
}
