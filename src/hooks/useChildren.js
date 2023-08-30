import { useGetChildrenQuery } from '../store/api';
import useHierarchies from './useHierarchies';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';
import useSelectedDate from './useSelectedDate';

export const useChildren = () => {
  const nodeId = useNodeId();
  const [hierarchies] = useHierarchies();
  const date = useSelectedDate();

  const { data, error, isFetching } = useGetChildrenQuery({
    nodeId,
    date,
    hierarchies: hierarchies.join(','),
  });

  if (isFetching) {
    return {
      children: [],
      error,
      isFetching,
    };
  }

  return {
    children: data,
    error,
    isFetching,
  };
};
