import React from 'react';
import { useNodeId } from './useNodeId';
import useSelectedDate from './useSelectedDate';
import useHierarchies from './useHierarchies';
import { useGetSuccessorsQuery } from '../store';

const useSuccessors = () => {
  const nodeId = useNodeId();
  const date = useSelectedDate();
  const [hierarchies] = useHierarchies();

  const { data, isFetching, error } = useGetSuccessorsQuery({
    nodeId,
    date,
    hierarchies: hierarchies.join(','),
  });

  if (isFetching) {
    return { successors: [], isFetching, error };
  }

  return { successors: data, isFetching, error };
};

export default useSuccessors;
