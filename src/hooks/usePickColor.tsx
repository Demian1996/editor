import { Transforms, Text } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { useSlate } from 'slate-react';

const usePickColor = (): [Subject<string>, EventHandler<string>] => {
  const [pickColor$, onPickColor] = useEventObservable<string>();
  const editor = useSlate();

  useEffect(() => {
    const subscription = pickColor$.subscribe((color: string) => {
      console.log('color::', color);
      Transforms.setNodes(editor, { color }, { match: (n) => Text.isText(n), split: true });
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  return [pickColor$, onPickColor];
};

export default usePickColor;
