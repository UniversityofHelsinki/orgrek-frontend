import { useGetParentsQuery } from '../store';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';

export const useParents = () => {
  const nodeId = useNodeId();
  const selectedDay = useSelector((state) => {
    return state.dr.selectedDay;
  });
  const selectedHierarchies = useSelector((state) => {
    return state.tree.selectedHierarchy || state.tree.defaultHierarchy;
  });

  const { data, error, isFetching } = useGetParentsQuery({
    nodeId,
    selectedDay,
    selectedHierarchies,
  });

  return {
    parents: data || [],
    error,
    isFetching,
  };
};
