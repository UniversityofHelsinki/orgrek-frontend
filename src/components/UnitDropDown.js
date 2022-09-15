import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchValidHierarchyFilters } from '../actions/hierarchyFiltersAction';

const UnitDropDown = (props) => {
    const { t } = useTranslation();
    const [selectableunits, setSelectableunits] = useState();

    const handleChange = (event) => {
        //setValue(event.target.value);
        const ev = { target: { name:'value', value: event.target.value } };
        props.onUnitChange(ev);
    };

    const sortHierarchies = (list) => {
        return list.sort((a, b) => (a.hierarchy > b.hierarchy) ? 1 : -1);
    };

    const concatValues = (data, hierarchyValues) => {
        let hierarchyValuesStr = '';
        data.map(obj => {
            if (hierarchyValues.includes(obj.hierarchy)) {
                hierarchyValuesStr = hierarchyValuesStr.concat(obj.value).concat(',');
        }});
        let uniqueValues = [];
        if (hierarchyValuesStr !== '') {
            let hierarchyValuesArray = hierarchyValuesStr.split(',');
            hierarchyValuesArray.forEach(function(el){
                if (!uniqueValues.includes(el)) {
                    uniqueValues.push(el);
            }});
        }
        return uniqueValues.toString().replace(/,\s*$/, '');//removes last comma and space (if there is a one)
    };


    useEffect(() => {
        props.fetchValidHierarchyFilters();
    }, []);

    useEffect(() => {
        const selectedHierarchies= props.selectedHierarchies;
        const currentHierarchyFilters = props.hierarchyFilters;
        let herarchiesWhereKeyValueIsType = [];
        herarchiesWhereKeyValueIsType = currentHierarchyFilters.filter(item => item.key === 'type');
        const sortedHierarchies = sortHierarchies(herarchiesWhereKeyValueIsType);
        let units =  concatValues(sortedHierarchies,selectedHierarchies);
        let unitselectable = units.split(',');
        setSelectableunits(unitselectable);
    }, [props.hierarchyFilters, props.selectedHierarchies]);

    return (
        <div>
            {selectableunits &&
                <>
                    <select  onChange={handleChange} defaultValue={'DEFAULT'}>
                        {selectableunits.map((option) => (
                            props.value === t(option) ?
                                <option key={option} value={props.value} selected>{t(props.value)}</option>
                            :
                                <option key={option} value={option}>{t(option)}</option>
                        ))}
                    </select>
                </>
            }
        </div>
    );

};

const mapStateToProps = state => ({
    hierarchyFilters: state.hierarchyFilters.validhierarchyFilters,
    selectedHierarchies: state.tree.selectedHierarchies
});

const mapDispatchToProps = (dispatch) => ({
    fetchValidHierarchyFilters: () => dispatch(fetchValidHierarchyFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitDropDown);
