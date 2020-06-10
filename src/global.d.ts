type Bold = 'bold';
type Italic = 'italic';
type Underline = 'underline';
type CodeBlock = 'codeBlock';
type Del = 'del';
type Color = 'color';
type Layout = 'left' | 'center' | 'right';
type List = 'orderedList' | 'unorderedList';
type ListItem = 'listItem';

type FormatType = Bold | Italic | Underline | CodeBlock | Del | Color | Layout | List | ListItem;

type FuncType = {
  bold: Bold;
  italic: Italic;
  underline: Underline;
  codeBlock: CodeBlock;
  del: Del;
  color: Color;
  listItem: ListItem;
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
