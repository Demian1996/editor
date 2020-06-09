import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';

export const isBlockCodeActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === FUNC.codeBlock,
  }) as any;

  return !!match;
};

const useToggleCodeBlock = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [codeBlock$, onToggleCodeBlock] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = codeBlock$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { type: isBlockCodeActive(editor) ? null : FUNC.codeBlock },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [codeBlock$]);

  return [codeBlock$, onToggleCodeBlock];
};

export default useToggleCodeBlock;
