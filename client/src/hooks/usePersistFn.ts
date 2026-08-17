import { useRef } from "react";

/**
 * usePersistFn instead of useCallback to reduce cognitive load.
 * Returns one stable function identity that always invokes the latest `fn`.
 */
export function usePersistFn<T extends (...args: never[]) => unknown>(fn: T) {
  // Plain mutable object: assignability doesn't depend on RefObject's
  // readonly `current` (which differs between React 18/19 typings).
  const fnRef = useRef({ fn });
  fnRef.current.fn = fn;

  const persistFn = useRef<
    ((...args: Parameters<T>) => ReturnType<T>) | undefined
  >();
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args: Parameters<T>) {
      // `fn` is T, so its real return type is ReturnType<T>; the cast only
      // re-widens lib's `Function.apply` result.
      return fnRef.current.fn.apply(this, args) as ReturnType<T>;
    };
  }

  return persistFn.current;
}
