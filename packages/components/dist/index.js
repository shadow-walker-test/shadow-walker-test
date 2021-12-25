import React from 'react';
import theme from '@shadow-walker-test/theme';

function Button(props) {
  const {
    children
  } = props;
  const buttonStyle = {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary,
    padding: theme.spacing.small
  };
  return /*#__PURE__*/React.createElement("button", {
    style: buttonStyle
  }, children, " 3243");
}

export { Button };
