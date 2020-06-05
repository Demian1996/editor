import React, { FC } from 'react';

const Leaf: React.FC = (props: any) => {
  return (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
      {props.children}
    </span>
  );
};

export default Leaf;
