import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Validity from '../attributes/Validity';
import AttributesTable from '../attributes/AttributesTable';
import useContentLanguage from '../../hooks/useContentLanguage';

const PredecessorsSection = () => {
  const { t } = useTranslation();
  const predecessors = useSelector((state) => state.nrd.nodePredecessors);
  const contentLanguage = useContentLanguage();

  const columns = [
    { label: t('name'), render: (item) => item.fullName },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
    {
      label: t('predecessor_edge_valid'),
      render: (item) => (
        <Validity startDate={item.edgeStartDate} endDate={item.edgeStartDate} />
      ),
    },
  ];

  const data = predecessors[contentLanguage] || [];
  const title = t('predecessors');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <AttributesTable columns={columns} data={data} summary={title} />
    </EditableAccordion>
  );
};

export default PredecessorsSection;
