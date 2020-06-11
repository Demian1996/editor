import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { isMarkActive, toggleMark } from '../utils';

export const isBoldActive = isMarkActive(FUNC.bold);

const useToggleBold = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [bold$, onToggleBold] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = bold$.subscribe((editor: Editor) => {
      toggleMark(editor, FUNC.bold);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [bold$]);

  return [bold$, onToggleBold];
};

export default useToggleBold;
