import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext();

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
  const [stack, setStack] = React.useState([]);

  const addToast = (message, variant) => {
    if (!message) return;

    setStack([...stack, { message, variant, id: crypto.randomUUID() }]);
  };

  const deleteToast = (toastId) => {
    const newStack = [...stack].filter(({ id }) => toastId !== id);

    setStack(newStack);
  };

  const dismissAllToasts = () => {
    setStack([]);
  };

  useEscapeKey(dismissAllToasts);

  return (
    <ToastContext.Provider
      value={{
        stack,
        setStack,
        addToast,
        deleteToast,
        dismissAllToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
