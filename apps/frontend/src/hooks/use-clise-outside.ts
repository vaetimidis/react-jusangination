import { useEffect } from 'react';

export const useClickOutside = (ref: React.RefObject<HTMLFormElement>, handleFunc: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleFunc();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleFunc]);
};
