import { useGetChildrenQuery } from '../store/api';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';

export const useChildren = () => {
  const nodeId = useNodeId();
  const selectedDay = useSelector((state) => {
    return state.tree.selectedDay;
  });
  const selectedHierarchies = useSelector((state) => {
    return state.tree.selectedHierarchy || state.tree.defaultHierarchy;
  });

  const { data, error, isFetching } = useGetChildrenQuery({
    nodeId,
    selectedDay,
    selectedHierarchies,
  });

  return {
    children: data || [],
    error,
    isFetching,
  };
};
