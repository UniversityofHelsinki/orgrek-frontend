import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import AttributesTable from '../attributes/AttributesTable';
import Validity from '../attributes/Validity';
import Placeholder from '../Placeholder';
import useSortAttributesByDate from '../../hooks/useSortAttributesByDate';
import useSortAttributesByLanguage from '../../hooks/useSortAttributesByLanguage';
import { useGetFullNamesQuery } from '../../store';
import { useNodeId } from '../../hooks/useNodeId';
import useFilterAttributesByDate from '../../hooks/useFilterAttributesByDate';

const DisplayNameSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const nodeId = useNodeId();

  const { data: names } = useGetFullNamesQuery(nodeId);

  const data =
    names &&
    [...(names.fi || []), ...(names.sv || []), ...(names.en || [])]
      .filter((n) => n)
      .map((dn) => ({
        ...dn,
        key: `name_${dn.language.toLowerCase()}`,
        value: dn.name,
      }));
  const presentNames = useFilterAttributesByDate(
    data || [],
    showHistory,
    showFuture
  );

  const columns = [
    { label: t('text_language_header'), render: (item) => t(item.key) },
    { label: t('name'), render: (item) => item.value },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];
  const sortedAttributesByDate = presentNames
    ? useSortAttributesByDate(presentNames)
    : [];
  const sortedData = useSortAttributesByLanguage(sortedAttributesByDate);

  const title = t('display_name_info');
  const empty = sortedData.length === 0;

  return (
    <EditableAccordion title={title}>
      <Placeholder empty={empty} placeholder={t('displayName.empty')}>
        <AttributesTable columns={columns} data={sortedData} summary={title} />
      </Placeholder>
    </EditableAccordion>
  );
};

export default DisplayNameSection;
