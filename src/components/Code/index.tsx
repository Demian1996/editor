import React, { FC } from 'react';

const Code: FC = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export default Code;
