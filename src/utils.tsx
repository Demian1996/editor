import { Editor, Transforms, Text } from 'slate';
import { FormatType, FUNC, List } from './const';

const toggleBlock = (editor: Editor, format: List) => {
  const LIST_TYPES = [FUNC.list.orderedList, FUNC.list.unorderedList];
  const isActive = isBlockActive(format)(editor);
  const isList = [FUNC.list.orderedList, FUNC.list.unorderedList].includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as any),
    split: true,
  });

  Transforms.setNodes(editor, { type: isActive ? null : format }, { match: (n) => Editor.isBlock(editor, n) });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
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
