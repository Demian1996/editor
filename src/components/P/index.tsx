import React, { FC } from 'react';

interface IProps {
  style: any;
  attributes: any;
}

const P: FC<IProps> = (props: any) => {
  return (
    <p style={props.style} {...props.attributes}>
      {props.children}
    </p>
  );
};

export default P;
