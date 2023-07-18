import { useGetNodeOtherAttributesQuery } from '../store';
import useHierarchies from './useHierarchies';
import { useNodeId } from './useNodeId';

export const useOtherAttributes = () => {
  const nodeId = useNodeId();
  const [selectedHierarchies] = useHierarchies();

  const { data, error, isFetching } = useGetNodeOtherAttributesQuery({
    nodeId,
    selectedHierarchies: selectedHierarchies.join(','),
  });

  return {
    nodeOtherAttributes: data || [],
    error,
    isFetching,
  };
};
