import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';

export const isUnderlineActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n[FUNC.underline] === true;
    },
    universal: true,
  }) as any;

  return !!match;
};

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
