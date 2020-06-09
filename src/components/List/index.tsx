import React, { FC } from 'react';

interface IProps {
  style: any;
  attributes: any;
}

const List: FC<IProps> = (props) => {
  return (
    <li style={props.style} {...props.attributes}>
      {props.children}
    </li>
  );
};

export default List;
