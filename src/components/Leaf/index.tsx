import React, { FC } from 'react';
import { FUNC, DEFAULT_FONT_COLOR } from '../../const';
import { RenderLeafProps } from 'slate-react';

interface IProps {
  leaf: {
    bold?: boolean;
    underline?: boolean;
    italic?: boolean;
    del?: boolean;
    color?: string;
  };
}

const Leaf: FC<RenderLeafProps & IProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.del) {
    children = <s>{children}</s>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return (
    <span
      {...attributes}
      style={{
        color: leaf[FUNC.color] ? leaf.color : DEFAULT_FONT_COLOR,
      }}
    >
      {children}
    </span>
  );
};

export default Leaf;
