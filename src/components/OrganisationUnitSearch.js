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
  const [singleSelections, setSingleSelections] = useState([]);
  const { tree } = useTree();
  const language = useContentLanguage();

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

  const options =
    tree && tree[language] ? flatten(tree[language].children) : [];
  const uniqueOptions = options.filter(
    (elem, index) =>
      options.findIndex((obj) => obj.uniqueId === elem.uniqueId) === index
  );
  if (tree && tree[language]) {
    const hy = {
      id: tree[language].id,
      name: tree[language].name,
      uniqueId: tree[language].uniqueId,
    };
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
      data-testid="ousearch"
      id="ou-code-and-name-search"
      labelKey={(option) => `${option.name}`}
      filterBy={(option, props) => {
        return (
          nameMatches(option.name, props.text) ||
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
