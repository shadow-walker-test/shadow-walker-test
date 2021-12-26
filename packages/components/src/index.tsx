'use strict';

import React, { FC } from 'react';
import theme from '@shadow-walker-test/theme';
import { useTranslation } from 'react-i18next';

export interface ButtonProps {
  text: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const { t }: { t: any } = useTranslation();

  const { children, text } = props;

  const buttonStyle = {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary,
    padding: theme.spacing.small,
  };

  return (
    <button style={buttonStyle}>
      {children} - {t(text)} - 11111
    </button>
  );
};

export function add(x: number, y: number): number {
  return x + y;
}
