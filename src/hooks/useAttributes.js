import React from 'react';
import useSelectedDate from './useSelectedDate';
import useHierarchies from './useHierarchies';
import { useNodeId } from './useNodeId';
import { useGetAttributesQuery } from '../store';

const useAttributes = (section) => {
  const nodeId = useNodeId();
  const [hierarchies] = useHierarchies();
  const date = useSelectedDate();

  const { data, isFetching, error } = useGetAttributesQuery({
    nodeId,
    hierarchies: hierarchies.join(','),
    date,
  });

  if (isFetching) {
    return { data: [], isFetching, error };
  }

  return { data: data[section], isFetching, error };
};

export default useAttributes;
