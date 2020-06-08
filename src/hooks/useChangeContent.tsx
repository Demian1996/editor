import { useDispatchAction } from '.';
import { changeContent } from '../store/actionCreator';
import { Node } from 'slate';
import { Subject } from 'rxjs';

const useChangeContent = (contentChange$: Subject<Node[]>) => {
  useDispatchAction(contentChange$, (content: Node[]) => {
    return changeContent({ content });
  });
};

export default useChangeContent;
