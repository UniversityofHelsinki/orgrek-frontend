import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import useTree from '../hooks/useTree';
import useContentLanguage from '../hooks/useContentLanguage';

const OrganisationUnitSearch = ({
  onOrganisationUnitChange,
  selectedParentOrganisationUnit,
}) => {
  const { t } = useTranslation();
  const language = useContentLanguage();
  const languageField = language === 'ia' ? 'fi' : language;

  const [singleSelections, setSingleSelections] = useState([]);
  const { trees } = useTree();

  const handleChange = (value) => {
    setSingleSelections(value);
    onOrganisationUnitChange(value[0]);
  };

  useEffect(() => {
    if (!selectedParentOrganisationUnit) {
      setSingleSelections([]);
    }
  }, [selectedParentOrganisationUnit]);

  const flatten = (current) =>
    current.reduce((a, c) => [...a, c, ...flatten(c.children)], []);

  const options = trees ? flatten(trees) : [];
  const uniqueOptions = options.filter(
    (elem, index) =>
      options.findIndex((obj) => obj.uniqueId === elem.uniqueId) === index
  );

  const nameMatches = (name, text) => {
    return name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  };

  const uniqueIdMatches = (uniqueId, text) => {
    return uniqueId.toString() === text.toLowerCase();
  };

  return (
    <Typeahead
      data-testid="ousearch"
      id="ou-code-and-name-search"
      labelKey={(option) => `${option.names[languageField]}`}
      filterBy={(option, props) => {
        return (
          nameMatches(option.names[languageField], props.text) ||
          uniqueIdMatches(option.uniqueId, props.text)
        );
      }}
      onChange={(value) => handleChange(value)}
      options={uniqueOptions}
      placeholder={t('type_three_char_to_start_search')}
      selected={singleSelections}
      minLength={3}
    />
  );
};

export default OrganisationUnitSearch;
