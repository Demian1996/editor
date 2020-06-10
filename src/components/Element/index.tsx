import React, { FC, Fragment } from 'react';
import { RenderElementProps } from 'slate-react';
import { Code, List, P } from '..';
import { FUNC } from '../../const';

const Element: FC<RenderElementProps> = ({ element, attributes, children }) => {
  switch (element.type) {
    case FUNC.codeBlock:
      children = (
        <Code style={{ textAlign: element.layout }} attributes={attributes}>
          {children}
        </Code>
      );
      break;
    case FUNC.list:
      children = (
        <List style={{ textAlign: element.layout }} attributes={attributes}>
          {children}
        </List>
      );
      break;
    default:
      children = (
        <P style={{ textAlign: element.layout }} attributes={attributes}>
          {children}
        </P>
      );
  }

  return <Fragment>{children}</Fragment>;
};

export default Element;
