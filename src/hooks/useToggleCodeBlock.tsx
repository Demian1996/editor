import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { Subject } from 'rxjs';

const isBlockCodeActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === 'code',
  }) as any;

  return !!match;
};

const useToggleCodeBlock = (codeBlock$: Subject<Editor>) => {
  useEffect(() => {
    const subscription = codeBlock$.subscribe((editor: Editor) => {
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
};

export default useToggleCodeBlock;
