import _ from 'lodash';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
  PaginatedResponseModel,
  PaginatedSearchRequestModel,
} from '@shadow-walker-test/core';
import useDebouncedCallback from './use-debounced-callback';
const randomId = () => Math.floor(Math.random() * 999 * Math.floor(9999999999));
type FetcherType = (
  // eslint-disable-next-line no-unused-vars
  x: PaginatedSearchRequestModel | any
) => Promise<PaginatedResponseModel<any>>;

interface StoreType {
  instanceId: number;
  fetcher: FetcherType | any;
  isFetching: boolean;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  searchText: string;
  fetchedOnce: boolean;
  fetchIds: number[];
  list: any[];
  minText: number;
  initialized: boolean;
  brokenMessage: string;
}

interface Config {
  fetcher: FetcherType;
  fetchOnMount: boolean;
  minText: number;
  extraArgs?: any;
}

type Action = { type: any; payload?: any };

const initialStore: StoreType = {
  instanceId: randomId(),
  fetcher: () => Promise.resolve(),
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
  brokenMessage: '',
};

const reducer = (state: StoreType, action: Action): StoreType => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        ...action.payload,
        initialized: true,
        instanceId: randomId(),
      };
    case 'reset':
      return { ...action.payload };
    case 'increaseIndex':
      return { ...state, pageIndex: state.pageIndex + 1 };
    case 'changeText':
      return {
        ...state,
        list: [],
        searchText: action.payload,
        rowCount: 0,
        pageIndex: 1,
        fetchedOnce: false,
      };
    case 'setLoad':
      return { ...state, isFetching: action.payload, brokenMessage: '' };
    case 'addFetchId':
      return { ...state, fetchIds: [...state.fetchIds, action.payload] };
    case 'removeFetchId':
      return {
        ...state,
        fetchIds: state.fetchIds.filter((x) => x !== action.payload),
      };
    case 'addList':
      if (_.last(state.fetchIds) === action.payload.fetchId)
        return {
          ...state,
          fetchedOnce: true,
          list: [...state.list, ...action.payload.result],
          rowCount: action.payload.rowCount,
        };
      return {
        ...state,
      };
    case 'setError':
      return { ...state, brokenMessage: action.payload, isFetching: false };
    case 'setInitialized':
      return {
        ...state,
        initialized: action.payload,
      };

    default:
      return state;
  }
};

const usePgs = (initialConfig: Config) => {
  const [store, unsafeDispatch]: [any, any] = useReducer(reducer, initialStore);

  const isMountRef = useRef(false);

  const loading = useMemo(
    () => store.isFetching || store.fetchIds.length > 0,
    [store.isFetching, store.fetchIds]
  );

  const isFull = useMemo(
    () => store.list.length >= store.rowCount && store.fetchedOnce,
    [store.list, store.rowCount, store.fetchedOnce]
  );

  useEffect(() => {
    isMountRef.current = true;
    return () => {
      isMountRef.current = false;
    };
  }, []);
  const dispatch = (...args) => {
    if (isMountRef.current) unsafeDispatch(...args);
  };
  const init = (config: Config) => {
    dispatch({
      type: 'init',
      payload: { ...initialStore, ...config },
    });
  };

  useEffect(() => {
    init(initialConfig);
  }, [initialConfig.extraArgs]);

  useEffect(() => {
    dispatch({
      type: 'clearPreFetchedValues',
    });
  }, [store.initialized]);

  const load = (isLoading) => {
    dispatch({
      type: 'setLoad',
      payload: isLoading,
    });
  };

  const addFetchId = (fetchId) => {
    dispatch({
      type: 'addFetchId',
      payload: fetchId,
    });
  };

  const removeFetchId = (fetchId) => {
    dispatch({
      type: 'removeFetchId',
      payload: fetchId,
    });
  };

  const setError = (message) => {
    dispatch({
      type: 'setError',
      payload: message,
    });
  };

  const fetch = () => {
    const fetchId = randomId();
    load(true);
    addFetchId(fetchId);

    (store.fetcher as FetcherType)({
      pageIndex: store.pageIndex,
      pageSize: store.pageSize,
      searchText: store.searchText,
      ...(initialConfig.extraArgs || {}),
    })
      .then((resp) => {
        dispatch({
          type: 'addList',
          payload: { ...resp.data, fetchId },
        });

        removeFetchId(fetchId);
        load(false);
      })
      .catch((err) => {
        removeFetchId(fetchId);
        setError(
          (err?.response?.errors?.length > 0 &&
            err.response.errors[0]?.message) ||
            ''
        );
      });
  };

  const debouncedFetch = useDebouncedCallback(() => {
    fetch();
  }, 500);

  useEffect(() => {
    if (
      !isFull &&
      store.initialized &&
      store.searchText.length >= store.minText
    ) {
      load(true);
      debouncedFetch();
    }
  }, [
    store.pageIndex,
    store.searchText,
    store.initialized,
    store.minText,
    store.instanceId,
  ]);

  const increaseIndex = () => {
    if (!store.isFetching) {
      dispatch({
        type: 'increaseIndex',
      });
    }
  };

  const changeSearchText = (text) => {
    dispatch({
      type: 'changeText',
      payload: text,
    });
  };

  const onTryAgain = () => {
    load(true);
    debouncedFetch();
  };

  return {
    options: store.list,
    loading,
    isFull,
    selectTemplate: {
      brokenMessage: store.brokenMessage,
      options: store.list,
      loading,
      // isFull,
      onScrollBottom: increaseIndex,
      onSearch: changeSearchText,
      serverSideSearch: true,
      minSearchText: store.minText,
      onTryAgain,
      // onFocus: () => {
      //   load(false);
      // },
    },
    store,
  };
};

export default usePgs;
