import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { Subject } from 'rxjs';

const isBoldMarkActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n.type === 'bold';
    },
    universal: true,
  }) as any;

  return !!match;
};

const useToggleBold = (bold$: Subject<Editor>) => {
  useEffect(() => {
    const subscription = bold$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { bold: isBoldMarkActive(editor) ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  });
};

export default useToggleBold;
