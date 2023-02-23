import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useAttributes from '../../hooks/useAttributes';
import AttributesTable from '../attributes/AttributesTable';

const OtherAttributesSection = () => {
  const { t } = useTranslation();
  const { otherAttributes } = useAttributes();

  const title = t('other_attributes');
  const empty = otherAttributes.length === 0;

  return (
    <EditableAccordion
      title={title}
      empty={empty}
      placeholder={t('nodeDetailsSection.noAttributes')}
    >
      <AttributesTable data={otherAttributes} summary={title} />
    </EditableAccordion>
  );
};

export default OtherAttributesSection;
