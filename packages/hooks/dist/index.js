'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var randomId = function randomId() {
  return Math.floor(Math.random() * 999 * Math.floor(9999999999));
};

var initialStore = {
  instanceId: randomId(),
  fetcher: function fetcher() {
    return Promise.resolve();
  },
  isFetching: false,
  pageIndex: 1,
  pageSize: 20,
  rowCount: 0,
  searchText: '',
  fetchedOnce: false,
  list: [],
  fetchIds: [],
  minText: 0,
  initialized: false,
  brokenMessage: ''
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return _objectSpread2(_objectSpread2(_objectSpread2({}, state), action.payload), {}, {
        initialized: true,
        instanceId: randomId()
      });

    case 'reset':
      return _objectSpread2({}, action.payload);

    case 'increaseIndex':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        pageIndex: state.pageIndex + 1
      });

    case 'changeText':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        list: [],
        searchText: action.payload,
        rowCount: 0,
        pageIndex: 1,
        fetchedOnce: false
      });

    case 'setLoad':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isFetching: action.payload,
        brokenMessage: ''
      });

    case 'addFetchId':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        fetchIds: [].concat(_toConsumableArray(state.fetchIds), [action.payload])
      });

    case 'removeFetchId':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        fetchIds: state.fetchIds.filter(function (x) {
          return x !== action.payload;
        })
      });

    case 'addList':
      if (___default["default"].last(state.fetchIds) === action.payload.fetchId) return _objectSpread2(_objectSpread2({}, state), {}, {
        fetchedOnce: true,
        list: [].concat(_toConsumableArray(state.list), _toConsumableArray(action.payload.result)),
        rowCount: action.payload.rowCount
      });
      return _objectSpread2({}, state);

    case 'setError':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        brokenMessage: action.payload,
        isFetching: false
      });

    case 'setInitialized':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        initialized: action.payload
      });

    default:
      return state;
  }
};

var usePgs = function usePgs(initialConfig) {
  var _useReducer = react.useReducer(reducer, initialStore),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      store = _useReducer2[0],
      unsafeDispatch = _useReducer2[1];

  var isMountRef = react.useRef(false);
  var loading = react.useMemo(function () {
    return store.isFetching || store.fetchIds.length > 0;
  }, [store.isFetching, store.fetchIds]);
  var isFull = react.useMemo(function () {
    return store.list.length >= store.rowCount && store.fetchedOnce;
  }, [store.list, store.rowCount, store.fetchedOnce]);
  react.useEffect(function () {
    isMountRef.current = true;
    return function () {
      isMountRef.current = false;
    };
  }, []);

  var dispatch = function dispatch() {
    if (isMountRef.current) unsafeDispatch.apply(void 0, arguments);
  };

  var init = function init(config) {
    dispatch({
      type: 'init',
      payload: _objectSpread2(_objectSpread2({}, initialStore), config)
    });
  };

  react.useEffect(function () {
    init(initialConfig);
  }, [initialConfig.extraArgs]);
  react.useEffect(function () {
    dispatch({
      type: 'clearPreFetchedValues'
    });
  }, [store.initialized]);

  var load = function load(isLoading) {
    dispatch({
      type: 'setLoad',
      payload: isLoading
    });
  };

  var addFetchId = function addFetchId(fetchId) {
    dispatch({
      type: 'addFetchId',
      payload: fetchId
    });
  };

  var removeFetchId = function removeFetchId(fetchId) {
    dispatch({
      type: 'removeFetchId',
      payload: fetchId
    });
  };

  var setError = function setError(message) {
    dispatch({
      type: 'setError',
      payload: message
    });
  };

  var fetch = function fetch() {
    var fetchId = randomId();
    load(true);
    addFetchId(fetchId);
    store.fetcher(_objectSpread2({
      pageIndex: store.pageIndex,
      pageSize: store.pageSize,
      searchText: store.searchText
    }, initialConfig.extraArgs || {})).then(function (resp) {
      dispatch({
        type: 'addList',
        payload: _objectSpread2(_objectSpread2({}, resp.data), {}, {
          fetchId: fetchId
        })
      });
      removeFetchId(fetchId);
      load(false);
    }).catch(function (err) {
      var _err$response, _err$response$errors, _err$response$errors$;

      removeFetchId(fetchId);
      setError((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : (_err$response$errors = _err$response.errors) === null || _err$response$errors === void 0 ? void 0 : _err$response$errors.length) > 0 && ((_err$response$errors$ = err.response.errors[0]) === null || _err$response$errors$ === void 0 ? void 0 : _err$response$errors$.message) || '');
    });
  };

  var debouncedFetch = useDebouncedCallback(function () {
    fetch();
  }, 500);
  react.useEffect(function () {
    if (!isFull && store.initialized && store.searchText.length >= store.minText) {
      load(true);
      debouncedFetch();
    }
  }, [store.pageIndex, store.searchText, store.initialized, store.minText, store.instanceId]);

  var increaseIndex = function increaseIndex() {
    if (!store.isFetching) {
      dispatch({
        type: 'increaseIndex'
      });
    }
  };

  var changeSearchText = function changeSearchText(text) {
    dispatch({
      type: 'changeText',
      payload: text
    });
  };

  var onTryAgain = function onTryAgain() {
    load(true);
    debouncedFetch();
  };

  return {
    options: store.list,
    loading: loading,
    isFull: isFull,
    selectTemplate: {
      brokenMessage: store.brokenMessage,
      options: store.list,
      loading: loading,
      onScrollBottom: increaseIndex,
      onSearch: changeSearchText,
      serverSideSearch: true,
      minSearchText: store.minText,
      onTryAgain: onTryAgain
    },
    store: store
  };
};

console.log('asd', usePgs);

exports.useDebouncedCallback = useDebouncedCallback;
exports.useIsMount = useIsMount;
exports.usePgs = usePgs;
//# sourceMappingURL=index.js.map
