import { Editor, Transforms, Text } from 'slate';
import { LIST_TYPES, FUNC } from './const';

export const clearBlock = (editor: Editor) => toggleBlock(editor, FUNC.p);

export const clearMark = (editor: Editor) => {
  // TODO: 临时使用变量区分element mark和text mark，后续细化类型时统一封装。
  const elementMarkList = ['layout'];
  const textMarkList = [FUNC.bold, FUNC.color, FUNC.del, FUNC.italic, FUNC.underline];

  Transforms.unsetNodes(editor, elementMarkList, {
    match: (n) => Editor.isBlock(editor, n),
  });
  Transforms.unsetNodes(editor, textMarkList, {
    match: (n) => Text.isText(n),
    split: true,
  });
};

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
