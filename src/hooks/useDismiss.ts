import { RefObject, useEffect } from 'react';

/** Calls `onDismiss` on Escape or a pointer press outside `ref` while `active`. */
export const useDismiss = (ref: RefObject<HTMLElement>, active: boolean, onDismiss: () => void) => {
  useEffect(() => {
    if (!active) return;
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, active, onDismiss]);
};
