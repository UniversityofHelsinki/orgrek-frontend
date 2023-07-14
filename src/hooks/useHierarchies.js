import { useSearchParams } from 'react-router-dom';
import { defaultHierarchy, queryParams } from '../Constants';

const useHierarchies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setHierarchies = (hierarchies = [defaultHierarchy]) => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set(queryParams.hierarchies, hierarchies.join(','));
    setSearchParams(newParams);
    return [hierarchies, setHierarchies];
  };

  if (searchParams.get(queryParams.hierarchies)) {
    const hierarchies = searchParams.get(queryParams.hierarchies);
    return [hierarchies.split(','), setHierarchies];
  }

  return setHierarchies(defaultHierarchy.split(','));
};

export default useHierarchies;
