import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';

const OrganisationUnitSearch = (props) => {
    const { t, i18n } = useTranslation();
    const [singleSelections, setSingleSelections] = useState([]);

    const handleChange = (value) => {
        setSingleSelections(value);
    };

    const flatten = (current) =>  current.reduce((a,c) => [...a, c, ...flatten(c.children)], []);
    const language = i18n.language === 'ia' ? 'fi' : i18n.language;
    const options = props.treeWithAllHierarchies[language] ? flatten(props.treeWithAllHierarchies[language].children) : [];

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
            options={options}
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

