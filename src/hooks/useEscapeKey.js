import React from 'react';

function useEscapeKey(cb) {
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.code === 'Escape') {
        cb();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [cb]);
}

export default useEscapeKey;
