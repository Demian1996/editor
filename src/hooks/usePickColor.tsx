import { Transforms, Text, Editor } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { useSlate } from 'slate-react';

export const getColor = (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return !!n.color;
    },
  }) as any;
  return match && match[0] ? match[0].color : null;
};

const usePickColor = (): [Subject<string>, EventHandler<string>] => {
  const [pickColor$, onPickColor] = useEventObservable<string>();
  const editor = useSlate();

  useEffect(() => {
    const subscription = pickColor$.pipe(throttleTime(300)).subscribe((color: string) => {
      Transforms.setNodes(editor, { color }, { match: (n) => Text.isText(n), split: true });
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [editor, pickColor$]);

  return [pickColor$, onPickColor];
};

export default usePickColor;
