import { useSearchParams } from 'react-router-dom';
import { defaultHierarchy, queryParams } from '../Constants';

const useHierarchies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const newParams = new URLSearchParams(Array.from(searchParams.entries()));

  const setHierarchies = (hierarchies = [defaultHierarchy]) => {
    newParams.set(queryParams.hierarchies, hierarchies.join(','));
    setSearchParams(newParams);
    return [hierarchies, setHierarchies];
  };

  if (searchParams.get(queryParams.hierarchies)) {
    const hierarchies = searchParams.get(queryParams.hierarchies);
    return [hierarchies.split(','), setHierarchies];
  }

  if (!searchParams.get(queryParams.hierarchies)) {
    newParams.set(queryParams.hierarchies, defaultHierarchy.split(','));
    setTimeout(() => setSearchParams(newParams));
  }
  return [defaultHierarchy.split(','), setHierarchies];
};

export default useHierarchies;
