import { Editor } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { clearBlock, clearMark } from '../utils';

const useClear = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [clear$, onClear] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = clear$.subscribe((editor: Editor) => {
      // 清空块级样式
      clearBlock(editor);
      // 清空内联样式
      clearMark(editor);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [clear$]);

  return [clear$, onClear];
};

export default useClear;
