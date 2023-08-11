import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Validity from '../attributes/Validity';
import AttributesTable from '../attributes/AttributesTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Link from '../Link';
import Placeholder from '../Placeholder';
import { useGetPredecessorsQuery } from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import usePredecessors from '../../hooks/usePredecessors';

const PredecessorsSection = () => {
  const { t } = useTranslation();
  const nodeId = useNodeId();
  const selectedDay = useSelector((state) => state.dr.selectedDay);
  const contentLanguage = useContentLanguage();
  const languageField = contentLanguage === 'ia' ? 'fi' : contentLanguage;

  const { predecessors, isFetching } = usePredecessors();

  if (isFetching) {
    return <></>;
  }

  const columns = [
    {
      label: t('name'),
      render: (item) => (
        <Link node={item.node.uniqueId}>{item.node.names[languageField]}</Link>
      ),
    },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.node.startDate} endDate={item.node.endDate} />
      ),
    },
    {
      label: t('predecessor_edge_valid'),
      render: (item) => (
        <Validity
          startDate={item.edges[0].startDate}
          endDate={item.edges[0].endDate}
        />
      ),
    },
  ];

  const keyFn = (item) =>
    `${item.node.name}-${item.node.startDate}-${item.node.endDate}-${item.edges[0].startDate}-${item.edges[0].endDate}`;

  const title = t('predecessors.title');
  const empty = predecessors.length === 0;

  return (
    <EditableAccordion title={title}>
      <Placeholder empty={empty} placeholder={t('predecessors.empty')}>
        <AttributesTable
          columns={columns}
          keyFn={keyFn}
          data={predecessors}
          summary={title}
        />
      </Placeholder>
    </EditableAccordion>
  );
};

export default PredecessorsSection;
