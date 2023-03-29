import { useGetPresentCodeAttributesQuery } from '../store';
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

  const { data, error, isFetching } = useGetPresentCodeAttributesQuery({
    nodeId,
    selectedDay,
    selectedHierarchies,
  });

  return { codeAttributes: data || [], error, isFetching };
};
