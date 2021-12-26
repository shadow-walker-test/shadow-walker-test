'use strict';

var _ = require('lodash');
var react = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

var useDebouncedCallback = function useDebouncedCallback(callback, delay, opts) {
  var callbackRef = react.useRef();
  callbackRef.current = callback;
  return react.useCallback(___default["default"].debounce(function () {
    return callbackRef.current.apply(callbackRef, arguments);
  }, delay, opts), []);
};

module.exports = useDebouncedCallback;
