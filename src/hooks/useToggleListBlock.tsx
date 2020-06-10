import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { LIST_TYPES, FUNC } from '../const';

export const isBlockListActive = (editor: Editor, format: List) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n.type === format;
    },
  }) as any;

  return !!match;
};

const useToggleListBlock = (format: List): [Subject<Editor>, EventHandler<Editor>] => {
  const [listBlock$, onToggleListBlock] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = listBlock$.subscribe((editor: Editor) => {
      const isActive = isBlockListActive(editor, format);
      Transforms.unwrapNodes(editor, {
        match: (n: any) => LIST_TYPES.includes(n.type),
        split: true,
      });
      Transforms.setNodes(
        editor,
        { type: isActive ? null : FUNC.listItem },
        { match: (n) => Editor.isBlock(editor, n) }
      );
      if (!isActive) {
        Transforms.wrapNodes(editor, {
          type: format,
          children: [],
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [format, listBlock$]);

  return [listBlock$, onToggleListBlock];
};

export default useToggleListBlock;
