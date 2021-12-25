'use strict';

import React, { FC } from 'react';
import theme from '@shadow-walker-test/theme';

export interface ButtonProps {
  text: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, text } = props;

  const buttonStyle = {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary,
    padding: theme.spacing.small,
  };

  return (
    <button style={buttonStyle}>
      {children} - {text} - 3243
    </button>
  );
};

export function add(x: number, y: number): number {
  return x + y;
}
