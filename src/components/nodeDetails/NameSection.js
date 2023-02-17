import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import useAttributes from '../../hooks/useAttributes';

const NameSection = () => {
  const { t } = useTranslation();
  const { nameAttributes } = useAttributes();

  const sortNameAttributesByDate = (elems, order) => {
    let result = [];
    for (let property in order) {
      const filteredBatch = elems.filter((e) => {
        return e.key === property;
      });
      filteredBatch.sort((a, b) => {
        return (
          (!(a.endDate || b.endDate) && 0) ||
          (!a.endDate && -1) ||
          (!b.endDate && 1) ||
          new Date(b.endDate) - new Date(a.endDate)
        );
      });
      result.push(filteredBatch);
    }
    return result.flat();
  };

  const orderNameAttributesByLanguage = (elems) => {
    const order = { name_fi: 0, name_sv: 1, name_en: 2, default: 3 };
    elems.sort((a, b) => order[a.key] - order[b.key]);
    return sortNameAttributesByDate(elems, order);
  };

  const nameInfoDataOrderedByLanguage = nameAttributes
    ? orderNameAttributesByLanguage(nameAttributes)
    : [];

  const title = t('name_info');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <AttributesTable data={nameInfoDataOrderedByLanguage} summary={title} />
    </EditableAccordion>
  );
};

export default NameSection;
