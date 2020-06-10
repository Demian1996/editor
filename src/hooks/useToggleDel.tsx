import { Editor } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { toggleMark, isMarkActive } from '../utils';

export const isDelActive = isMarkActive(FUNC.del);

const useToggleDel = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [del$, onToggleDel] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = del$.subscribe((editor: Editor) => {
      toggleMark(editor, FUNC.del);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [del$]);

  return [del$, onToggleDel];
};

export default useToggleDel;
