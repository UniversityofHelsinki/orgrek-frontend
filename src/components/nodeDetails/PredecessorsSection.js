import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Validity from '../attributes/Validity';
import AttributesTable from '../attributes/AttributesTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Link from '../Link';

const PredecessorsSection = () => {
  const { t } = useTranslation();
  const predecessors = useSelector((state) => state.nrd.nodePredecessors);
  const contentLanguage = useContentLanguage();

  const columns = [
    {
      label: t('name'),
      render: (item) => <Link node={item.uniqueId}>{item.fullName}</Link>,
    },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
    {
      label: t('predecessor_edge_valid'),
      render: (item) => (
        <Validity startDate={item.edgeStartDate} endDate={item.edgeEndDate} />
      ),
    },
  ];

  const keyFn = (item) =>
    `${item.fullName}-${item.startDate}-${item.endDate}-${item.edgeStartDate}-${item.edgeEndDate}`;

  const data = predecessors[contentLanguage] || [];
  const title = t('predecessors');
  const empty = data.length === 0;

  return (
    <EditableAccordion
      title={title}
      empty={empty}
      placeholder={t('predecessors.empty')}
    >
      <AttributesTable
        columns={columns}
        keyFn={keyFn}
        data={data}
        summary={title}
      />
    </EditableAccordion>
  );
};

export default PredecessorsSection;
