import React from 'react';
import IconButton from './IconButton';
import TextButton from './TextButton';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = props => {
  if (props.icon && !props.title) {
    return <IconButton {...props} />;
  }

  return <TextButton {...props} />;
};

export default React.memo(Button);
