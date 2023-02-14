import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchValidHierarchyFilters } from '../actions/hierarchyFiltersAction';

const UnitDropDown = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.elemValue);
  const [selectableUnits, setSelectableUnits] = useState([]);

  const handleSelect = (event) => {
    setValue(event.target.value);
    const ev = { target: { name: 'value', value: event.target.value } };
    props.onUnitChange(ev);
  };

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

  useEffect(() => {
    props.fetchValidHierarchyFilters();
  }, []);

  useEffect(() => {
    const selectedHierarchies = props.selectedHierarchies;
    const currentHierarchyFilters = props.hierarchyFilters;
    let hierarchiesWhereKeyValueIsType = [];
    hierarchiesWhereKeyValueIsType = currentHierarchyFilters.filter(
      (item) => item.key === 'type'
    );
    const sortedHierarchies = sortHierarchies(hierarchiesWhereKeyValueIsType);
    let units = concatValues(sortedHierarchies, selectedHierarchies);
    let selectableUnitArrayList = units.split(',');
    setSelectableUnits(selectableUnitArrayList);
  }, [props.hierarchyFilters, props.selectedHierarchies]);

  return (
    <div>
      {selectableUnits && (
        <>
          <select value={value} onChange={handleSelect}>
            <option value="">-</option>
            {selectableUnits.map((option, i) => (
              <option key={i} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  hierarchyFilters: state.hierarchyFilters.validhierarchyFilters,
  selectedHierarchies: state.tree.selectedHierarchies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchValidHierarchyFilters: () => dispatch(fetchValidHierarchyFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitDropDown);
