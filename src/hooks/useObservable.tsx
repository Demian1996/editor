import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export default function useObservable<T>(input$: Observable<T>, initialState?: T) {
  const [value, setValue] = useState(initialState);
  useEffect(() => {
    const subscription = input$.subscribe({
      next: (value) => {
        setValue(value);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [input$]);

  return value;
}
