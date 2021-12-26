import { Button } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import VsButtonProps from './vs-button.props';

const VsButton: FC<VsButtonProps> = ({ text, textTx, ...props }) => {
  const { t }: { t: any } = useTranslation();

  return (
    <Button {...props}>
      {(textTx ? t(textTx) : text) || props.children} - from sw
    </Button>
  );
};

export default VsButton;
