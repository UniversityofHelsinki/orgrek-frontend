import { useDispatch, useSelector } from 'react-redux';
import { fetchNode } from '../actions/nodeAction';
import { useEffect } from 'react';
import { useNodeId } from './useNodeId';

/**
 * Fetches and updates node state when query param uid changes.
 *
 * This hook fetches data for the legacy reducers. Use useNodeId hook when
 * passing node id to Redux Toolkit queries.
 */
const useFetchNode = () => {
  const dispatch = useDispatch();
  const nodeId = useNodeId();

  useEffect(() => {
    if (nodeId) {
      dispatch(fetchNode(nodeId, true));
    }
  }, [nodeId]);

  return useSelector((state) => state.nrd.node);
};

export default useFetchNode;
