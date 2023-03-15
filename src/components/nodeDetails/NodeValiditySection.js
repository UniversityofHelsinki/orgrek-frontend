import React from 'react';
import Validity from '../attributes/Validity';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Placeholder from '../Placeholder';

const NodeValiditySection = () => {
  const { t } = useTranslation();
  const node = useSelector((state) => state.nrd.node);

  if (!node) {
    return null;
  }

  const empty = !node.startDate && !node.endDate;

  return (
    <EditableAccordion title={t('valid_dates')}>
      <Placeholder empty={empty} placeholder={<Validity />}>
        <Typography variant="body1">
          <Validity startDate={node.startDate} endDate={node.endDate} />
        </Typography>
      </Placeholder>
    </EditableAccordion>
  );
};

export default NodeValiditySection;