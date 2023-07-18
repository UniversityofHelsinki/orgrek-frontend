import { useGetChildrenQuery } from '../store/api';
import useHierarchies from './useHierarchies';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';

export const useChildren = () => {
  const nodeId = useNodeId();
  const selectedDay = useSelector((state) => {
    return state.tree.selectedDay;
  });
  const [selectedHierarchies] = useHierarchies();

  const { data, error, isFetching } = useGetChildrenQuery({
    nodeId,
    selectedDay,
    selectedHierarchies: selectedHierarchies.join(','),
  });

  return {
    children: data || [],
    error,
    isFetching,
  };
};
