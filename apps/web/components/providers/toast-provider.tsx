'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Toast, {
  type ToastItem,
  type ToastVariant,
} from '@/components/ui/toast';

const TOAST_DURATION = 2000;

interface ContextValue {
  show: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = uuid();

      setToasts((prev) => [...prev, { id, message, variant }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_DURATION);
    },
    [],
  );

  return (
    <ToastContext value={{ show }}>
      {children}
      <Toast toasts={toasts} />
    </ToastContext>
  );
}
