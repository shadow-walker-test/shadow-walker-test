'use strict';

var react = require('react');

var useIsMount = function useIsMount() {
  var isMountRef = react.useRef(false);
  react.useEffect(function () {
    isMountRef.current = true;
    return function () {
      isMountRef.current = false;
    };
  }, []);
  return isMountRef.current;
};

module.exports = useIsMount;
