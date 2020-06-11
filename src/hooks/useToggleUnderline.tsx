import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { isMarkActive, toggleMark } from '../utils';

export const isUnderlineActive = isMarkActive(FUNC.underline);

const useToggleUnderline = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [underline$, onToggleUnderline] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = underline$.subscribe((editor: Editor) => {
      toggleMark(editor, FUNC.underline);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [underline$]);

  return [underline$, onToggleUnderline];
};

export default useToggleUnderline;
