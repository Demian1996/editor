import React, { FC } from 'react';
import { FUNC } from '../../const';

const NORMAL = 'normal';
const NONE = 'none';

const Leaf: React.FC = (props: any) => {
  console.log(props);
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf[FUNC.bold] ? FUNC.bold : NORMAL,
        fontStyle: props.leaf[FUNC.italic] ? FUNC.italic : NORMAL,
        textDecoration: props.leaf[FUNC.underline] ? FUNC.underline : NONE,
      }}
    >
      {props.children}
    </span>
  );
};

export default Leaf;
