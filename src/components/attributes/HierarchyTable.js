import React from 'react';
import AttributesTable from './AttributesTable';
import Validity from './Validity';
import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';
import Link from '../Link';
import useContentLanguage from '../../hooks/useContentLanguage';

const HierarchyTable = ({ data, ...props }) => {
  const { t } = useTranslation();
  const language = useContentLanguage();
  const languageField = language === 'ia' ? 'fi' : language;

  const columns = [
    {
      label: t('unit'),
      renderCell: (column, item) =>
        // Render unit cell only on the first hierarchy row
        item.rowSpan && (
          <TableCell
            key={column.label}
            rowSpan={item.rowSpan}
            sx={{ verticalAlign: 'top' }}
          >
            <Link node={item.uniqueId}>{item.unit}</Link>
          </TableCell>
        ),
    },
    { label: t('hierarchies'), render: (item) => t(item.hierarchy) },
    {
      label: t('hierarchy_valid'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];

  const keyFn = (item, index) =>
    `${index}-${item.uniqueId}-${item.hierarchy}-${item.startDate}-${item.endDate}`;

  const units = data
    .map((item) =>
      item.edges.map((edge, index) => ({
        uniqueId: item.node.uniqueId,
        unit: item.node.names[languageField],
        // Unit name cell spans all hierarchies
        rowSpan: index === 0 && item.edges.length,
        ...edge,
      }))
    )
    .flat();

  return (
    <AttributesTable columns={columns} keyFn={keyFn} data={units} {...props} />
  );
};

export default HierarchyTable;
