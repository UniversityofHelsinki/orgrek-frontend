import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useAttributes from '../../hooks/useAttributes';
import Validity from '../attributes/Validity';
import AttributesTable from '../attributes/AttributesTable';

const OtherAttributesSection = () => {
  const { t } = useTranslation();
  const { otherAttributes } = useAttributes();

  const columns = [
    { label: t('attribute'), render: (item) => t(item.key) },
    { label: t('value'), render: (item) => item.value },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];
  const title = t('other_attributes');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <AttributesTable
        columns={columns}
        data={otherAttributes}
        summary={title}
      />
    </EditableAccordion>
  );
};

export default OtherAttributesSection;
