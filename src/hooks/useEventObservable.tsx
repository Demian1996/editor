import { Subject } from 'rxjs';
import { useMemo, useCallback } from 'react';

type EventHandler<T> = (value: T) => void;

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
