import { Subject } from 'rxjs';
import { useMemo, useCallback } from 'react';

export type EventHandler<T> = (value: T) => void;

/**
 * 生成回调事件和事件流，当回调事件触发时，生成事件流
 *
 * @export
 * @template T
 * @returns {[Subject<T>, EventHandler<T>]}
 */
export default function useEventObservable<T>(): [Subject<T>, EventHandler<T>] {
  const subject$ = useMemo(() => new Subject<T>(), []);
  const handleEvent = useCallback<EventHandler<T>>(
    (value) => {
      subject$.next(value);
    },
    [subject$]
  );

  return [subject$, handleEvent];
}
