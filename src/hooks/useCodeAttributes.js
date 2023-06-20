import { useGetCodeAttributesQuery } from '../store';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';

export const useCodeAttributes = () => {
  const nodeId = useNodeId();
  const selectedHierarchies = useSelector((state) => {
    return state.tree.selectedHierarchy || state.tree.defaultHierarchy;
  });
  const selectedDay = useSelector((state) => {
    return state.tree.selectedDay;
  });

  const { data, error, isFetching } = useGetCodeAttributesQuery({ nodeId });

  const uniqueId = {
    id: Math.floor(Math.random() * -100000),
    key: 'unique_id',
    value: nodeId,
    startDate: null,
    endDate: null,
  };

  return {
    codeAttributes: (data && [uniqueId, ...data]) || [uniqueId],
    error,
    isFetching,
  };
};
