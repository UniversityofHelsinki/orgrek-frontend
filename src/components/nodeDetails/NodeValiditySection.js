import React from 'react';
import Validity from '../attributes/Validity';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useNode from '../../hooks/useNode';

const NodeValiditySection = () => {
  const { t } = useTranslation();
  const node = useNode();

  return (
    <EditableAccordion title={t('valid_dates')} defaultExpanded>
      <Validity startDate={node.startDate} endDate={node.endDate} />
    </EditableAccordion>
  );
};

export default NodeValiditySection;
