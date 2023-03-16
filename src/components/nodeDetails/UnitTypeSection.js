import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useAttributes from '../../hooks/useAttributes';
import AttributesTable from '../attributes/AttributesTable';
import Placeholder from '../Placeholder';

const UnitTypeSection = () => {
  const { t } = useTranslation();
  const { typeAttributes } = useAttributes();

  const title = t('unit_type');
  const empty = typeAttributes.length === 0;

  return (
    <EditableAccordion title={title}>
      <Placeholder
        empty={empty}
        placeholder={t('nodeDetailsSection.noAttributes')}
      >
        <AttributesTable data={typeAttributes} summary={title} />
      </Placeholder>
    </EditableAccordion>
  );
};

export default UnitTypeSection;
