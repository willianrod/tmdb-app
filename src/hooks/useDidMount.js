import { useEffect } from 'react';

const useDidMount = (callback) => {
  useEffect(callback, []);
};

export default useDidMount;
