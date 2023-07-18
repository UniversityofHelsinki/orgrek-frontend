import { useSelector } from 'react-redux';
import {
  useGetAttributeKeysBySectionQuery,
  useGetValidHierarchyFiltersQuery,
} from '../store';
import useHierarchies from './useHierarchies';

const sortHierarchyFilters = (list) => {
  return list.sort((a, b) => (a.hierarchy > b.hierarchy ? 1 : -1));
};

const concatValues = (data, hierarchyValues) => {
  let hierarchyValuesStr = '';
  data.map((obj) => {
    let matchingHierarchy = hierarchyValues
      .split(',')
      .filter((s) => s === obj.hierarchy);
    if (matchingHierarchy.length > 0) {
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
  const [hierarchies] = useHierarchies();
  const selectedHierarchies = hierarchies.join(',');
  const { data: hierarchyFilters, isFetching: isFetchingHierarchyFilters } =
    useGetValidHierarchyFiltersQuery();
  const { data: keysData, isFetching: isFetchingKeys } =
    useGetAttributeKeysBySectionQuery('types');
  const keys = (keysData || []).map((key) => key.attr);

  const unitTypeOptions = [];

  if (hierarchyFilters && keys && keys.length > 0) {
    const hierarchyFiltersWhereKeyValueIsType = Object.values(
      hierarchyFilters
    ).filter((item) => item.key === keys[0]);
    const sortedHierarchyFilters = sortHierarchyFilters(
      hierarchyFiltersWhereKeyValueIsType
    );
    const units = concatValues(sortedHierarchyFilters, selectedHierarchies);
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
    isFetching: isFetchingHierarchyFilters || isFetchingKeys,
  };
};

export default useUnitTypeOptions;
