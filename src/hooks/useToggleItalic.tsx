import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { isMarkActive } from '../utils';

export const isItalicActive = isMarkActive(FUNC.italic);

const useToggleItalic = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [italic$, onToggleItalic] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = italic$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { [FUNC.italic]: isItalicActive(editor) ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [italic$]);

  return [italic$, onToggleItalic];
};

export default useToggleItalic;
