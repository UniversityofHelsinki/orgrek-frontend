import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Validity from './Validity';
import { useTranslation } from 'react-i18next';

const AttributesTable = ({ columns, data, summary, keyFn }) => {
  const { t } = useTranslation();

  const defaultColumns = [
    { label: t('attribute'), render: (item) => t(item.key) },
    { label: t('value'), render: (item) => t(item.value) },
    {
      label: t('valid_dates'),
      render: (item) => (
        <Validity startDate={item.startDate} endDate={item.endDate} />
      ),
    },
  ];
  const defaultKeyFn = (item) =>
    `${item.key}-${item.startDate}-${item.endDate}`;

  const cols = columns || defaultColumns;
  const getKey = keyFn || defaultKeyFn;

  const renderedHeaders = cols.map((column) => (
    <TableCell key={column.label}>{column.label}</TableCell>
  ));

  const renderedRows = data.map((item) => {
    const renderedCells = cols.map((column) => (
      <TableCell key={column.label}>{column.render(item)}</TableCell>
    ));

    return <TableRow key={getKey(item)}>{renderedCells}</TableRow>;
  });

  return (
    <TableContainer component="div">
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
