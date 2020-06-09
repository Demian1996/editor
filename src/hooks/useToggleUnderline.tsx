import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { isMarkActive } from '../utils';

export const isUnderlineActive = isMarkActive(FUNC.underline);

const useToggleUnderline = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [underline$, onToggleUnderline] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = underline$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { [FUNC.underline]: isUnderlineActive(editor) ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [underline$]);

  return [underline$, onToggleUnderline];
};

export default useToggleUnderline;
