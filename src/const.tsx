export const DEFAULT_FONT_COLOR = '#000000';

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
  listItem: 'listItem',
  p: 'p',
};

export const LIST_TYPES = [FUNC.list.orderedList, FUNC.list.unorderedList];

export const HOTKEYS = {
  [FUNC.bold]: 'mod+b',
  [FUNC.italic]: 'mod+i',
  [FUNC.underline]: 'mod+u',
  [FUNC.codeBlock]: 'mod+`',
  [FUNC.layout.left]: 'cmd+shift+l',
  [FUNC.layout.center]: 'cmd+shift+c',
  [FUNC.layout.right]: 'cmd+shift+r',
};
