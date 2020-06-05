import React, { FC } from 'react';

const P: FC = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default P;
