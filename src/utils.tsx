import { Editor, Transforms, Text } from 'slate';
import { LIST_TYPES } from './const';

export const toggleBlock = (editor: Editor, format: FormatType) => {
  // 如果外部有套ol、ul标签，则去除包裹
  Transforms.unwrapNodes(editor, {
    match: (n: any) => LIST_TYPES.includes(n.type),
    split: true,
  });
  Transforms.setNodes(
    editor,
    { type: isBlockActive(format)(editor) ? null : format },
    { match: (n) => Editor.isBlock(editor, n) }
  );
};

export const toggleMark = (editor: Editor, format: FormatType) => {
  Transforms.setNodes(
    editor,
    { [format]: isMarkActive(format)(editor) ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

export const isBlockActive = (format: FormatType) => (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  }) as any;

  return !!match;
};

export const isMarkActive = (format: FormatType) => (editor: Editor) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      return n[format] === true;
    },
    universal: true,
  }) as any;
  return !!match;
};
