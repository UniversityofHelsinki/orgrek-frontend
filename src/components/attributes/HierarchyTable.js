import React from 'react';
import AttributesTable from './AttributesTable';
import Validity from './Validity';
import { useTranslation } from 'react-i18next';

const HierarchyTable = (props) => {
  const { t } = useTranslation();

  const columns = [
    { label: t('unit'), render: (item) => item.fullName },
    { label: t('hierarchies'), render: (item) => t(item.hierarchy) },
    {
      label: t('hierarchy_valid'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  return <AttributesTable columns={columns} {...props} />;
};

export default HierarchyTable;
