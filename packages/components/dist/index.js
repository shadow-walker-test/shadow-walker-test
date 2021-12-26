'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var theme = require('@shadow-walker-test/theme');
var reactI18next = require('react-i18next');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var theme__default = /*#__PURE__*/_interopDefaultLegacy(theme);

var Button = function Button(props) {
  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var children = props.children,
      text = props.text;
  var buttonStyle = {
    color: theme__default["default"].palette.white,
    backgroundColor: theme__default["default"].palette.primary,
    padding: theme__default["default"].spacing.small
  };
  return React__default["default"].createElement("button", {
    style: buttonStyle
  }, children, " - ", t(text), " - 11111");
};
function add(x, y) {
  return x + y;
}

exports.Button = Button;
exports.add = add;
//# sourceMappingURL=index.js.map
