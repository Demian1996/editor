import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';

export const isBlockDelActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === FUNC.delBlock,
  }) as any;

  return !!match;
};

const useToggleDelBlock = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [delBlock$, onToggleDelBlock] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = delBlock$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { type: isBlockDelActive(editor) ? null : FUNC.delBlock },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [delBlock$]);

  return [delBlock$, onToggleDelBlock];
};

export default useToggleDelBlock;
