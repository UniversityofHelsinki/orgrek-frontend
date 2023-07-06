import { useGetTreeQuery } from '../store';
import { useSelector } from 'react-redux';

/**
 * Fetches the tree on the selected day and including selected hierarchies.
 */
const useTree = () => {
  const { selectedHierarchy, selectedDay } = useSelector((state) => ({
    selectedHierarchy: state.tree.selectedHierarchy,
    selectedDay: state.dr.selectedDay,
  }));

  const { data, error, isFetching } = useGetTreeQuery({
    hierarchies: selectedHierarchy ? selectedHierarchy : 'talous',
    selectedDay,
  });

  return { trees: data || [], error, isFetching };
};

export default useTree;
