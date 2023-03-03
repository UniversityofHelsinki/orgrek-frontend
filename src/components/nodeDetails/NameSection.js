import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import useAttributes from '../../hooks/useAttributes';
import Validity from '../attributes/Validity';
import EditNameForm from './EditNameForm';
import EditableContent from '../EditableContent';
import Placeholder from '../Placeholder';

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

  const initialValues = {
    nameFi: nameInfoDataOrderedByLanguage.filter(
      (value) => value.key === 'name_fi'
    ),
    nameSv: nameInfoDataOrderedByLanguage.filter(
      (value) => value.key === 'name_sv'
    ),
    nameEn: nameInfoDataOrderedByLanguage.filter(
      (value) => value.key === 'name_en'
    ),
  };

  const handleSubmit = (values) => {
    // TODO
  };

  const renderedContent = (
    <AttributesTable
      columns={columns}
      data={nameInfoDataOrderedByLanguage}
      summary={title}
    />
  );

  return (
    <EditableAccordion title={title}>
      <EditableContent
        renderEditor={() => <EditNameForm />}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Placeholder empty={empty} placeholder={t('nameInfo.empty')}>
          {renderedContent}
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default NameSection;
