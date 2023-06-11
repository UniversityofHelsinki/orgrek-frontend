import { useGetNodeOtherAttributesQuery } from '../store';
import { useNodeId } from './useNodeId';
import { useSelector } from 'react-redux';

export const useOtherAttributes = () => {
  const nodeId = useNodeId();
  const selectedHierarchies = useSelector((state) => {
    return state.tree.selectedHierarchy || state.tree.defaultHierarchy;
  });

  const { data, error, isFetching } = useGetNodeOtherAttributesQuery({
    nodeId,
    selectedHierarchies,
  });

  return {
    nodeOtherAttributes: data || [],
    error,
    isFetching,
  };
};
