import { defaultHierarchy } from '../Constants';
import { useGetTreeQuery } from '../store';
import { useSelector } from 'react-redux';
import useHierarchies from './useHierarchies';

/**
 * Fetches the tree on the selected day and including selected hierarchies.
 */
const useTree = () => {
  const { selectedDay } = useSelector((state) => ({
    selectedDay: state.dr.selectedDay,
  }));

  const [hierarchies, setHierarchies] = useHierarchies();

  const { data, error, isFetching } = useGetTreeQuery({
    hierarchies,
    selectedDay,
  });

  const emptyTrees = {
    fi: [],
    sv: [],
    en: [],
  };

  if (error) {
    return { trees: emptyTrees, error, isFetching };
  }
  return { trees: data || emptyTrees, error, isFetching };
};

export default useTree;
