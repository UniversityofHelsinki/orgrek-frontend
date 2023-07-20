import { useGetParentsQuery } from '../store';
import useHierarchies from './useHierarchies';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';

export const useParents = () => {
  const nodeId = useNodeId();
  const [hierarchies] = useHierarchies();
  const selectedDay = useSelector((state) => {
    return state.dr.selectedDay;
  });

  const { data, error, isFetching } = useGetParentsQuery({
    nodeId,
    selectedDay,
    selectedHierarchies: hierarchies.join(','),
  });

  return {
    parents: data || {},
    error,
    isFetching,
  };
};
