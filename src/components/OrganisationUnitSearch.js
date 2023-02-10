import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';

const OrganisationUnitSearch = (props) => {
    const { t, i18n } = useTranslation();
    const [singleSelections, setSingleSelections] = useState([]);

    const handleChange = (value) => {
        setSingleSelections(value);
        props.onOrganisationUnitChange(value[0]);
    };

    useEffect(() => {
        if (!props.selectedParentOrganisationUnit) {
            setSingleSelections([]);
        }
    }, [props.selectedParentOrganisationUnit]);

    const flatten = (current) =>  current.reduce((a,c) => [...a, c, ...flatten(c.children)], []);
    const language = i18n.language === 'ia' ? 'fi' : i18n.language;
    const options = props.treeWithAllHierarchies[language] ? flatten(props.treeWithAllHierarchies[language].children) : [];
    const uniqueOptions = options.filter((elem, index) => options.findIndex(obj => obj.uniqueId === elem.uniqueId) === index);
    if (props.treeWithAllHierarchies[language]) {
        const hy = { id: props.treeWithAllHierarchies[language].id, name: props.treeWithAllHierarchies[language].name, uniqueId: props.treeWithAllHierarchies[language].uniqueId };
        uniqueOptions.push(hy);
    }

    const nameMatches = (name, text) => {
        return name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    };

    const uniqueIdMatches = (uniqueId, text) => {
        return uniqueId.toString() === text.toLowerCase();
    };

    return (
        <Typeahead
            data-testid='ousearch'
            id="ou-code-and-name-search"
            labelKey={(option) => `${option.name}`}
            filterBy={(option, props) => {
                return nameMatches(option.name, props.text) || uniqueIdMatches(option.uniqueId, props.text) ? true : false;
            }}
            onChange={ value  => handleChange(value)}
            options={uniqueOptions}
            placeholder={t('type_three_char_to_start_search')}
            selected={singleSelections}
            minLength={3}
        />
    );

};

const mapStateToProps = state => ({
    treeWithAllHierarchies : state.tree.treeWithAllHierarchies
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationUnitSearch);

