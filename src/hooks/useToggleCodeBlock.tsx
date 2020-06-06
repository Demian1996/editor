import { useEventObservable } from './index';
import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';

const isBlockCodeActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === 'code',
  }) as any;

  return !!match;
};

const useToggleCodeBlock = () => {
  const [stream$, onTrigger] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = stream$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { type: isBlockCodeActive(editor) ? null : 'code' },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  return onTrigger;
};

export default useToggleCodeBlock;
