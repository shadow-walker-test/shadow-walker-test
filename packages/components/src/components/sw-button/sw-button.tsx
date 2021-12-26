import { Button } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SwButtonProps from './sw-button.props';

const SwButton: FC<SwButtonProps> = ({ text, textTx, ...props }) => {
  const { t }: { t: any } = useTranslation();

  return (
    <Button {...props}>
      {(textTx ? t(textTx) : text) || props.children} - from sw
    </Button>
  );
};

export default SwButton;
