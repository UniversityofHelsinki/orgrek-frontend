import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Validity from './Validity';
import { useTranslation } from 'react-i18next';

const AttributesTable = ({ columns, data, summary, keyFn, sx }) => {
  const { t } = useTranslation();

  const defaultColumns = [
    { label: t('attribute.label'), render: (item) => t(item.key) },
    { label: t('value'), render: (item) => t(item.value) },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];
  const defaultKeyFn = (item) =>
    `${item.key}-${item.value}-${item.startDate}-${item.endDate}`;

  const cols = columns || defaultColumns;
  const getKey = keyFn || defaultKeyFn;

  const renderHeader = (column) => (
    <TableCell key={column.label}>{column.label}</TableCell>
  );

  const renderCell = (column, item) => (
    <TableCell key={column.label}>{column.render(item)}</TableCell>
  );

  const renderedHeaders = cols.map((column) => {
    if (column.renderHeader) {
      return column.renderHeader(column);
    } else {
      return renderHeader(column);
    }
  });

  const renderedRows = data.map((item, index) => {
    const renderedCells = cols.map((column) => {
      if (column.renderCell) {
        return column.renderCell(column, item);
      } else {
        return renderCell(column, item);
      }
    });

    return <TableRow key={getKey(item, index)}>{renderedCells}</TableRow>;
  });

  return (
    <TableContainer
      component="div"
      data-testid="attributesTable"
      sx={[{ mb: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Table size="small" aria-label={summary} summary={summary}>
        <TableHead>
          <TableRow>{renderedHeaders}</TableRow>
        </TableHead>
        <TableBody>{renderedRows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttributesTable;
