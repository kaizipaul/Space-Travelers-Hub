/* eslint-disable react/prop-types */
import {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

const TOAST_MS = 3000;
let nextId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message) => {
    nextId += 1;
    const id = nextId;
    setToasts((current) => [...current, { id, message }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, TOAST_MS);
  }, []);

  const value = useMemo(() => notify, [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="glass animate-fade-up border-neon-400/40 bg-space-800/90 px-5 py-3 text-sm font-medium text-neon-300 shadow-neon"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
