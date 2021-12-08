import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import { selectNameVersion, flattenTree } from '../actions/utilAction';
import { fetchNodeParents, fetchNodeChildren } from '../actions/hierarchyAction';
import { fetchNode, fetchNodeAttributes, fetchNodePredecessors, fetchNodeSuccessors } from '../actions/nodeAction';

const TreeSearch = (props) => {
    const { t, i18n } = useTranslation();
    const [singleSelections, setSingleSelections] = useState([]);

    const handleChange = (value) => {
        setSingleSelections(value);
        value.length > 0 ? props.onSearchResultSelection(props.selectedDay, value[0].id) : false;
    };
    
    const options = flattenTree(props.tree.tree ? props.tree.tree.children : []);

    return (
            <Typeahead
                data-testid='treesearch'
                id="code-and-name-search"
                labelKey={(option) => `${option.code} ${selectNameVersion(i18n, option)}`}
                onChange={ value  => handleChange(value)}
                options={options}
                placeholder={t('type_three_char_to_start_search')}
                selected={singleSelections}
                minLength={3}
            />
    );

};

const mapStateToProps = state => ({
    tree : state.tree.tree,
    selectedDay : state.dr.selectedDay
});

const mapDispatchToProps = (dispatch) => ({
    onSearchResultSelection: (selectedDay, searcResultId) => {
        dispatch(fetchNode(searcResultId));
        dispatch(fetchNodeAttributes(searcResultId, selectedDay));
        dispatch(fetchNodeParents(searcResultId, selectedDay));
        dispatch(fetchNodeChildren(searcResultId, selectedDay));
        dispatch(fetchNodePredecessors(searcResultId));
        dispatch(fetchNodeSuccessors(searcResultId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeSearch);

