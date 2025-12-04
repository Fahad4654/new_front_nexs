import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

export interface ToastMessage {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, severity: AlertColor, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, severity: AlertColor = 'info', duration: number = 3000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastMessage = { id, message, severity, duration };
      
      setToasts((prevToasts) => [...prevToasts, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => showToast(message, 'success', duration),
    [showToast]
  );

  const showError = useCallback(
    (message: string, duration?: number) => showToast(message, 'error', duration),
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => showToast(message, 'warning', duration),
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => showToast(message, 'info', duration),
    [showToast]
  );

  const handleClose = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration}
          onClose={() => handleClose(toast.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            top: `${20 + index * 80}px !important`,
          }}
        >
          <Alert
            onClose={() => handleClose(toast.id)}
            severity={toast.severity}
            variant="filled"
            sx={{
              width: '100%',
              minWidth: '300px',
              boxShadow: 2,
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};