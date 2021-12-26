'use strict';

require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.promise.js');
require('core-js/modules/es.object.assign.js');
require('core-js/modules/es.array.concat.js');
require('core-js/modules/es.array.filter.js');
var _ = require('lodash');
var react = require('react');
var useDebouncedCallback = require('./use-debounced-callback.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

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
      return Object.assign({}, state, action.payload, {
        initialized: true,
        instanceId: randomId()
      });

    case 'reset':
      return Object.assign({}, action.payload);

    case 'increaseIndex':
      return Object.assign({}, state, {
        pageIndex: state.pageIndex + 1
      });

    case 'changeText':
      return Object.assign({}, state, {
        list: [],
        searchText: action.payload,
        rowCount: 0,
        pageIndex: 1,
        fetchedOnce: false
      });

    case 'setLoad':
      return Object.assign({}, state, {
        isFetching: action.payload,
        brokenMessage: ''
      });

    case 'addFetchId':
      return Object.assign({}, state, {
        fetchIds: [].concat(state.fetchIds, [action.payload])
      });

    case 'removeFetchId':
      return Object.assign({}, state, {
        fetchIds: state.fetchIds.filter(function (x) {
          return x !== action.payload;
        })
      });

    case 'addList':
      if (___default["default"].last(state.fetchIds) === action.payload.fetchId) return Object.assign({}, state, {
        fetchedOnce: true,
        list: [].concat(state.list, action.payload.result),
        rowCount: action.payload.rowCount
      });
      return Object.assign({}, state);

    case 'setError':
      return Object.assign({}, state, {
        brokenMessage: action.payload,
        isFetching: false
      });

    case 'setInitialized':
      return Object.assign({}, state, {
        initialized: action.payload
      });

    default:
      return state;
  }
};

var usePgs = function usePgs(initialConfig) {
  var _useReducer = react.useReducer(reducer, initialStore),
      store = _useReducer[0],
      unsafeDispatch = _useReducer[1];

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
      payload: Object.assign({}, initialStore, config)
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
    store.fetcher(Object.assign({
      pageIndex: store.pageIndex,
      pageSize: store.pageSize,
      searchText: store.searchText
    }, initialConfig.extraArgs || {})).then(function (resp) {
      dispatch({
        type: 'addList',
        payload: Object.assign({}, resp.data, {
          fetchId: fetchId
        })
      });
      removeFetchId(fetchId);
      load(false);
    })["catch"](function (err) {
      var _err$response, _err$response$errors, _err$response$errors$;

      removeFetchId(fetchId);
      setError((err == null ? void 0 : (_err$response = err.response) == null ? void 0 : (_err$response$errors = _err$response.errors) == null ? void 0 : _err$response$errors.length) > 0 && ((_err$response$errors$ = err.response.errors[0]) == null ? void 0 : _err$response$errors$.message) || '');
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

module.exports = usePgs;
