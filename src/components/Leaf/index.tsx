import React, { FC } from 'react';
import { FUNC } from '../../const';

const NORMAL = 'normal';

const Leaf: React.FC = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf[FUNC.bold] ? FUNC.bold : NORMAL,
        fontStyle: props.leaf[FUNC.italic] ? FUNC.italic : NORMAL,
      }}
    >
      {props.children}
    </span>
  );
};

export default Leaf;
