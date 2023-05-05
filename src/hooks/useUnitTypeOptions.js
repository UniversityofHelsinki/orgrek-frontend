import { useSelector } from 'react-redux';
import {
  useGetAttributeKeysBySectionQuery,
  useGetValidHierarchyFiltersQuery,
} from '../store';
import fillSelectableUnits from './filterSelectableUnits';

/**
 * Returns all available unit type options for the currently selected
 * hierarchies.
 */
const useUnitTypeOptions = () => {
  const selectedHierarchies = useSelector(
    (state) => state.tree.selectedHierarchy
  );
  const { data: hierarchies, isFetching: isFetchingHierarchies } =
    useGetValidHierarchyFiltersQuery();
  const { data: keysData, isFetching: isFetchingKeys } =
    useGetAttributeKeysBySectionQuery('types');
  const keys = (keysData || []).map((key) => key.attr);

  const unitTypeOptions = [];
  fillSelectableUnits(unitTypeOptions, hierarchies, selectedHierarchies, keys);

  return {
    unitTypeOptions,
    isFetching: isFetchingHierarchies || isFetchingKeys,
  };
};

export default useUnitTypeOptions;
