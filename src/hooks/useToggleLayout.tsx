import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';

export const isLayoutActive = (editor: Editor, layout: Layout) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n.layout === layout;
    },
  }) as any;

  return !!match;
};

const useToggleLayout = (layout: Layout): [Subject<Editor>, EventHandler<Editor>] => {
  const [layout$, onToggleLayout] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = layout$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        {
          layout: isLayoutActive(editor, layout) ? null : layout,
        },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [layout, layout$]);

  return [layout$, onToggleLayout];
};

export default useToggleLayout;
