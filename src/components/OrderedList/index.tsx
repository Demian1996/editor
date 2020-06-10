import React, { FC } from 'react';

interface IProps {
  attributes: any;
}

const OrderedList: FC<IProps> = (props) => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

export default OrderedList;
