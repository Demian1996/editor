import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';

export const isBlockListActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === FUNC.list,
  }) as any;

  return !!match;
};

const useToggleListBlock = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [listBlock$, onToggleListBlock] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = listBlock$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { type: isBlockListActive(editor) ? null : FUNC.list },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [listBlock$]);

  return [listBlock$, onToggleListBlock];
};

export default useToggleListBlock;

