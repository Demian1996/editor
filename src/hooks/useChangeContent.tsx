import { useEventObservable } from '.';
import { Node } from 'slate';
import { Subject } from 'rxjs';
import { EventHandler } from './useEventObservable';

const useChangeContent = (): [Subject<Node[]>, EventHandler<Node[]>] => {
  const [changeContent$, onChangeContent] = useEventObservable<Node[]>();

  return [changeContent$, onChangeContent];
};

export default useChangeContent;
