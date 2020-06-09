import React, { FC } from 'react';

interface IProps {
  style: any;
  attributes: any;
}

const Del: FC<IProps> = (props) => {
  return (
    <del style={props.style} {...props.attributes}>
      <p>{props.children}</p>
    </del>
  );
};

export default Del;
