import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import useAttributes from '../../hooks/useAttributes';
import Validity from '../attributes/Validity';

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

  const columns = [
    { label: t('text_language_header'), render: (item) => t(item.key) },
    { label: t('name'), render: (item) => item.value },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  const title = t('name_info');
  const empty = nameInfoDataOrderedByLanguage.length === 0;

  return (
    <EditableAccordion
      title={title}
      empty={empty}
      placeholder={t('nameInfo.empty')}
    >
      <AttributesTable
        columns={columns}
        data={nameInfoDataOrderedByLanguage}
        summary={title}
      />
    </EditableAccordion>
  );
};

export default NameSection;
