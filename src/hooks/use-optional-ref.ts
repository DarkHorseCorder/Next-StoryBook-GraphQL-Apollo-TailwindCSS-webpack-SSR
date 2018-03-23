import { Ref, RefObject, useRef } from 'react';

/**
 * Returns a fallback ref if no ref or a callback ref is passed.
 * Otherwise, it returns the original ref.
 */
export default function useOptionalRef<T>(ref?: Ref<T> | null): RefObject<T> {
  const fallbackRef = useRef<T>(null);
  if (ref && 'instance' in ref) return fallbackRef;
  return (ref as RefObject<T>) ?? fallbackRef;
}
