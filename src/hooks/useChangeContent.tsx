import { useDispatchAction, useEventObservable } from ".";
import { changeContent } from '../store/actionCreator';
import { Node } from 'slate';

const useChangeContent = () => {
  const [stream$, onTrigger] = useEventObservable<Node[]>();
  useDispatchAction(stream$, (content: Node[]) => {
    return changeContent({ content });
  });

  return onTrigger;
};

export default useChangeContent;
