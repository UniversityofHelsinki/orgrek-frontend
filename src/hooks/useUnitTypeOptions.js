import { useSelector } from 'react-redux';
import {
  useGetAttributeKeysBySectionQuery,
  useGetValidHierarchyFiltersQuery,
} from '../store';

const sortHierarchies = (list) => {
  return list.sort((a, b) => (a.hierarchy > b.hierarchy ? 1 : -1));
};

const concatValues = (data, hierarchyValues) => {
  let hierarchyValuesStr = '';
  data.map((obj) => {
    if (hierarchyValues.includes(obj.hierarchy)) {
      hierarchyValuesStr = hierarchyValuesStr.concat(obj.value).concat(',');
    }
  });
  let uniqueValues = [];
  if (hierarchyValuesStr !== '') {
    let hierarchyValuesArray = hierarchyValuesStr.split(',');
    hierarchyValuesArray.forEach(function (el) {
      if (!uniqueValues.includes(el)) {
        uniqueValues.push(el);
      }
    });
  }
  return uniqueValues.toString().replace(/,\s*$/, ''); //removes last comma and space (if there is a one)
};

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

  if (hierarchies && keys && keys.length > 0) {
    const hierarchiesWhereKeyValueIsType = Object.values(hierarchies).filter(
      (item) => item.key === keys[0]
    );
    const sortedHierarchies = sortHierarchies(hierarchiesWhereKeyValueIsType);
    const units = concatValues(sortedHierarchies, selectedHierarchies);
    const selectableUnitArrayList = units.split(',');
    selectableUnitArrayList.forEach((value) => {
      unitTypeOptions.push({
        value: value,
        label: value,
      });
    });
  }

  return {
    unitTypeOptions,
    isFetching: isFetchingHierarchies || isFetchingKeys,
  };
};

export default useUnitTypeOptions;
