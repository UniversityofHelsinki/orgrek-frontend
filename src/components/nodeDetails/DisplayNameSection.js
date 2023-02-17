import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import { useSelector } from 'react-redux';

const DisplayNameSection = () => {
  const { t } = useTranslation();
  const displayNames = useSelector((state) => state.nrd.nodeDisplayNames);

  const data = [
    ...(displayNames.fi || []),
    ...(displayNames.sv || []),
    ...(displayNames.en || []),
  ]
    .filter((n) => n)
    .map((dn) => ({
      ...dn,
      key: `name_${dn.language.toLowerCase()}`,
      value: dn.name,
    }));

  const title = t('display_name_info');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <AttributesTable data={data} summary={title} />
    </EditableAccordion>
  );
};

export default DisplayNameSection;
