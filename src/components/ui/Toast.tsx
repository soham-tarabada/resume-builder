import React, { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';

type ToastTone = 'success' | 'error' | 'info';

interface ToastOptions {
  tone?: ToastTone;
  action?: { label: string; onClick: () => void };
}

interface ToastItem extends ToastOptions {
  id: number;
  message: string;
}

const ToastContext = createContext<(message: string, options?: ToastOptions) => void>(() => {});

// eslint-disable-next-line react-refresh/only-export-components -- hook is co-located with its provider
export const useToast = () => useContext(ToastContext);

const ICONS = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  error: <XCircle className="h-5 w-5 text-rose-400" />,
  info: <Info className="h-5 w-5 text-sky-400" />,
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => setToasts(current => current.filter(toast => toast.id !== id)), []);

  const notify = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const id = ++nextId.current;
      setToasts(current => [...current.slice(-2), { id, message, ...options }]);
      window.setTimeout(() => dismiss(id), options.action ? 6000 : 3500);
    },
    [dismiss]
  );

  const value = useMemo(() => notify, [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2 px-4 lg:bottom-6" aria-live="polite">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-center gap-3 rounded-2xl bg-slate-900/95 px-4 py-3 text-sm text-white shadow-2xl shadow-slate-900/30 ring-1 ring-white/10 backdrop-blur"
            role="status"
          >
            {ICONS[toast.tone ?? 'success']}
            <span className="flex-1">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  dismiss(toast.id);
                }}
                className="rounded-lg px-2 py-1 font-semibold text-indigo-300 transition hover:bg-white/10 hover:text-indigo-200"
              >
                {toast.action.label}
              </button>
            )}
            <button type="button" onClick={() => dismiss(toast.id)} className="text-slate-400 transition hover:text-white" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
