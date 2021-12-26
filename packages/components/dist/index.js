'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var antd = require('antd');
var reactI18next = require('react-i18next');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var _excluded = ["text", "textTx"];

var SwButton = function SwButton(_ref) {
  var text = _ref.text,
      textTx = _ref.textTx,
      props = _objectWithoutProperties(_ref, _excluded);

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  return React.createElement(antd.Button, props, (textTx ? t(textTx) : text) || props.children, " - from sw");
};

exports.SwButton = SwButton;
//# sourceMappingURL=index.js.map
