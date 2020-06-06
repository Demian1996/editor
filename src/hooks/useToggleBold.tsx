import { useEventObservable } from './index';
import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';

const isBoldMarkActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n.type === 'bold';
    },
    universal: true,
  }) as any;

  return !!match;
};

const useToggleBold = () => {
  const [stream$, onTrigger] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = stream$.subscribe((editor: Editor) => {
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

  return onTrigger;
};

export default useToggleBold;
