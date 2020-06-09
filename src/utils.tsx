import { Editor, Transforms, Text } from 'slate';
import { FormatType } from './const';

export const toggleBlock = (editor: Editor, format: FormatType) => {
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
