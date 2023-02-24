import React from 'react';
import Validity from '../attributes/Validity';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useNode from '../../hooks/useNode';
import Typography from '@mui/material/Typography';

const NodeValiditySection = () => {
  const { t } = useTranslation();
  const node = useNode();

  if (!node) {
    return null;
  }

  const empty = !node.startDate && !node.endDate;

  return (
    <EditableAccordion
      title={t('valid_dates')}
      empty={empty}
      placeholder={<Validity />}
    >
      <Typography variant="body1">
        <Validity startDate={node.startDate} endDate={node.endDate} />
      </Typography>
    </EditableAccordion>
  );
};

export default NodeValiditySection;
