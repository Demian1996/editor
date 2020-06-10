import React, { FC } from 'react';

interface IProps {
  attributes: any;
}

const UnorderedList: FC<IProps> = (props) => {
  return <ul {...props.attributes}>{props.children}</ul>;
};

export default UnorderedList;
