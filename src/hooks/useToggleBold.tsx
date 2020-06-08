import { Editor, Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';

const isBoldMarkActive = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n[FUNC.bold] === true;
    },
    universal: true,
  }) as any;

  return !!match;
};

const useToggleBold = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [bold$, onToggleBold] = useEventObservable<Editor>();

  useEffect(() => {
    const subscription = bold$.subscribe((editor: Editor) => {
      Transforms.setNodes(
        editor,
        { [FUNC.bold]: isBoldMarkActive(editor) ? null : true },
        { match: (n) => Text.isText(n), split: true }
      );
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  return [bold$, onToggleBold];
};

export default useToggleBold;
