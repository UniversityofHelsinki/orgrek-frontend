import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useAttributes from '../../hooks/useAttributes';
import AttributesTable from '../attributes/AttributesTable';

const UnitTypeSection = () => {
  const { t } = useTranslation();
  const { typeAttributes } = useAttributes();

  const title = t('unit_type');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <AttributesTable data={typeAttributes} summary={title} />
    </EditableAccordion>
  );
};

export default UnitTypeSection;
