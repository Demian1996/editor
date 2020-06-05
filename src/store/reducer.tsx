import Immutable, { ImmutableObject } from 'seamless-immutable';
import { Node } from 'slate';
import { ActionType } from './actionCreator';

interface EditorState {
  content: Node[];
}

const initState = Immutable<EditorState>({
  content: [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ],
});

type StateType = ImmutableObject<EditorState>;

function reducer(state: StateType = initState, action: ActionType) {
  switch (action.type) {
    case 'CHANGE_CONTENT':
      return state.set('content', action.payload.content);
    default:
      return state;
  }
}

export default reducer;
export type { StateType };
