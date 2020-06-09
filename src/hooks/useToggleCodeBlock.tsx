import { Editor, Transforms } from 'slate';
import { useEffect } from 'react';
import { useEventObservable } from '.';
import { EventHandler } from './useEventObservable';
import { Subject } from 'rxjs';
import { FUNC } from '../const';
import { isBlockActive, toggleBlock } from '../utils';

export const isBlockCodeActive = isBlockActive(FUNC.codeBlock);

const useToggleCodeBlock = (): [Subject<Editor>, EventHandler<Editor>] => {
  const [codeBlock$, onToggleCodeBlock] = useEventObservable<Editor>();
  useEffect(() => {
    const subscription = codeBlock$.subscribe((editor: Editor) => {
      toggleBlock(editor, FUNC.codeBlock);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [codeBlock$]);

  return [codeBlock$, onToggleCodeBlock];
};

export default useToggleCodeBlock;
