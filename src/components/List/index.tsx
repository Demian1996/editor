import React, { FC } from 'react';

interface IProps {
  style: any;
  attributes: any;
}

const List: FC<IProps> = (props) => {
  return (
    <ol style={props.style} {...props.attributes}>
      {props.children}
    </ol>
  );
};

export default List;
