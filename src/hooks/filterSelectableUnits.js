import React from 'react';

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

const fillSelectableUnits = (
  selectableUnits,
  data,
  selectedHierarchies,
  keys
) => {
  if (data && keys && keys.length > 0) {
    const hierarchiesWhereKeyValueIsType = Object.values(data).filter(
      (item) => item.key === keys[0]
    );
    const sortedHierarchies = sortHierarchies(hierarchiesWhereKeyValueIsType);
    const units = concatValues(sortedHierarchies, selectedHierarchies);
    const selectableUnitArrayList = units.split(',');
    selectableUnits.length = 0;
    selectableUnitArrayList.forEach((value) => {
      selectableUnits.push({
        value: value,
        label: value,
      });
    });
  }
};

export default fillSelectableUnits;
