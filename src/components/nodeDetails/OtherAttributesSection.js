import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useAttributes from '../../hooks/useAttributes';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';

const OtherAttributesSection = () => {
  const { t } = useTranslation();
  const { otherAttributes } = useAttributes();

  const title = t('other_attributes');
  const empty = otherAttributes.length === 0;

  return (
    <EditableAccordion title={title}>
      <Placeholder
        empty={empty}
        placeholder={t('nodeDetailsSection.noAttributes')}
      >
        <AttributesTable data={otherAttributes} summary={title} />
      </Placeholder>
    </EditableAccordion>
  );
};

export default OtherAttributesSection;
