import React, { FC } from 'react';

interface IProps {
  style: any;
  attributes: any;
}

const Code: FC<IProps> = (props) => {
  return (
    <pre style={props.style} {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export default Code;
