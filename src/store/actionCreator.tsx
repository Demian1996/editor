import { Node } from 'slate';

export interface ActionType {
  type: string;
  payload: {
    [key: string]: any;
  };
}

export type ActionCreator = (payload: any) => ActionType;

export function changeContent(payload: { content: Node[] }): ActionType {
  return {
    type: 'CHANGE_CONTENT',
    payload,
  };
}
