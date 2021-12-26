import _ from 'lodash';
import { useCallback, useRef } from 'react';

const useDebouncedCallback = (callback, delay, opts?) => {
  const callbackRef: any = useRef();
  callbackRef.current = callback;
  return useCallback(
    _.debounce((...args) => callbackRef.current(...args), delay, opts),
    [],
  );
};

export default useDebouncedCallback;
