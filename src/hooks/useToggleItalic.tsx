import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { isMarkActive, toggleMark } from '../utils';

export const isItalicActive = isMarkActive(FUNC.italic);

const useToggleItalic = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [italic$, onToggleItalic] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = italic$.subscribe((editor: Editor) => {
      toggleMark(editor, FUNC.italic);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [italic$]);

  return [italic$, onToggleItalic];
};

export default useToggleItalic;
