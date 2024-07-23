import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lowerFirstLetter } from '../utils';

//Abstracted Redux --> get loading, refresh status and data for each key
export const useReduxQuery = (
  key = 'Key',
  action,
  options = { updates: [] }
) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const data = useSelector(
    options.selector ||
      (state =>
        state[`${lowerFirstLetter(key)}`] &&
        state[`${lowerFirstLetter(key)}`].data)
  );

  const getData = useCallback(
    async setAction => {
      try {
        setAction(true);
        await dispatch(action());
        setAction(false);
      } catch (error) {
        setAction(false);
        setError(error.message);
      }
    },
    [dispatch, action]
  );

  const refresh = () => getData(setRefreshing);

  useEffect(() => {
    !options.focus && getData(setLoading);
    return () => {};
  }, [getData, options.focus]);

  return {
    [`loading${key}`]: loading,
    [`refreshing${key}`]: refreshing,
    [`${lowerFirstLetter(key)}`]: data,
    [`error${key}`]: error,
    [`refresh${key}`]: refresh,
  };
};
