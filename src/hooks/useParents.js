import { useGetParentsQuery } from '../store';
import useHierarchies from './useHierarchies';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';
import useSelectedDate from './useSelectedDate';

export const useParents = () => {
  const nodeId = useNodeId();
  const [hierarchies] = useHierarchies();
  const date = useSelectedDate();

  const { data, error, isFetching } = useGetParentsQuery({
    nodeId,
    date,
    hierarchies: hierarchies.join(','),
  });

  if (isFetching) {
    return { parents: [], error, isFetching };
  }

  return {
    parents: data,
    error,
    isFetching,
  };
};
