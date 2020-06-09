export const FUNC: FuncType = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  codeBlock: 'codeBlock',
  delBlock: 'delBlock',
  color: 'color',
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

export type FuncType = {
  bold: Bold;
  italic: Italic;
  underline: Underline;
  codeBlock: CodeBlock;
  delBlock: DelBlock;
  color: Color;
  layout: {
    left: Layout;
    center: Layout;
    right: Layout;
  };
};

export type Bold = 'bold';
export type Italic = 'italic';
export type Underline = 'underline';
export type CodeBlock = 'codeBlock';
export type DelBlock = 'delBlock';
export type Color = 'color';
export type Layout = 'left' | 'center' | 'right';

export const DEFAULT_FONT_COLOR = '#000000';
