import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchNode } from '../actions/nodeAction';
import { useEffect } from 'react';

/**
 * Fetches and updates node state when query param uid changes.
 *
 * @return {*}
 */
const useFetchNode = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const nodeId = searchParams.get('uid');

  useEffect(() => {
    if (nodeId) {
      dispatch(fetchNode(nodeId, true));
    }
  }, [nodeId]);

  return useSelector((state) => state.nrd.node);
};

export default useFetchNode;
