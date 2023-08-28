import React from 'react';
import { useNodeId } from './useNodeId';
import useSelectedDate from './useSelectedDate';
import useHierarchies from './useHierarchies';
import { useGetPredecessorsQuery } from '../store';

const usePredecessors = () => {
  const nodeId = useNodeId();
  const date = useSelectedDate();
  const [hierarchies] = useHierarchies();

  const { data, isFetching, error } = useGetPredecessorsQuery({
    nodeId,
    date,
    hierarchies: hierarchies.join(','),
  });

  if (isFetching) {
    return { predecessors: [], isFetching, error };
  }

  return { predecessors: data, isFetching, error };
};

export default usePredecessors;
