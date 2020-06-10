export type Bold = 'bold';
export type Italic = 'italic';
export type Underline = 'underline';
export type CodeBlock = 'codeBlock';
export type Del = 'del';
export type Color = 'color';
export type Layout = 'left' | 'center' | 'right';
export type List = 'orderedList' | 'unorderedList';
export const DEFAULT_FONT_COLOR = '#000000';

export type FormatType = Bold | Italic | Underline | CodeBlock | Del | Color | Layout | List;

export type FuncType = {
  bold: Bold;
  italic: Italic;
  underline: Underline;
  codeBlock: CodeBlock;
  del: Del;
  color: Color;
  list: {
    orderedList: List;
    unorderedList: List;
  };
  layout: {
    left: Layout;
    center: Layout;
    right: Layout;
  };
};

export const FUNC: FuncType = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  codeBlock: 'codeBlock',
  del: 'del',
  color: 'color',
  list: {
    orderedList: 'orderedList',
    unorderedList: 'unorderedList',
  },
  layout: {
    left: 'left',
    center: 'center',
    right: 'right',
  },
};

export const HOTKEYS = {
  [FUNC.bold]: 'mod+b',
  [FUNC.italic]: 'mod+i',
  [FUNC.underline]: 'mod+u',
  [FUNC.codeBlock]: 'mod+`',
  [FUNC.layout.left]: 'cmd+shift+l',
  [FUNC.layout.center]: 'cmd+shift+c',
  [FUNC.layout.right]: 'cmd+shift+r',
};
