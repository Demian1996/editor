import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import { Code, P, OrderedList, UnorderedList } from '..';
import { FUNC } from '../../const';

interface IProps {
  element: {
    layout?: Layout;
  };
}

const Element: FC<RenderElementProps & IProps> = ({ element, attributes, children }) => {
  switch (element.type) {
    case FUNC.codeBlock:
      return (
        <Code style={{ textAlign: element.layout }} attributes={attributes}>
          {children}
        </Code>
      );
    case FUNC.list.orderedList:
      return <OrderedList attributes={attributes}>{children}</OrderedList>;
    case FUNC.list.unorderedList:
      return <UnorderedList attributes={attributes}>{children}</UnorderedList>;
    case FUNC.listItem:
      return (
        <li style={{ textAlign: element.layout }} {...attributes}>
          {children}
        </li>
      );
    default:
      return (
        <P style={{ textAlign: element.layout }} attributes={attributes}>
          {children}
        </P>
      );
  }
};

export default Element;
