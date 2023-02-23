import React from 'react';
import AttributesTable from './AttributesTable';
import Validity from './Validity';
import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';

const HierarchyTable = ({ data, ...props }) => {
  const { t } = useTranslation();

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
            {item.unit}
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

  const keyFn = (item) =>
    `${item.unit}-${item.hierarchy}-${item.startDate}-${item.endDate}`;

  const hierarchyData = data
    .map((item) =>
      item.hierarchies.map((hierarchy, index) => ({
        unit: item.fullName,
        // Unit name cell spans all hierarchies
        rowSpan: index === 0 && item.hierarchies.length,
        ...hierarchy,
      }))
    )
    .flat();

  return (
    <AttributesTable
      columns={columns}
      keyFn={keyFn}
      data={hierarchyData}
      {...props}
    />
  );
};

export default HierarchyTable;
