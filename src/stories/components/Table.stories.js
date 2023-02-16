import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default {
  component: Table,
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
  },
};

export const Basic = {
  args: {
    size: 'medium',
    caption: '',
  },
  render: ({ size, caption }) => (
    <TableContainer component="div">
      <Table size={size} aria-label="example" summary={caption}>
        {caption && <caption>{caption}</caption>}
        <TableHead>
          <TableRow>
            <TableCell>Kieli</TableCell>
            <TableCell>Nimi</TableCell>
            <TableCell>Voimassaolo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Suomeksi</TableCell>
            <TableCell>Tietotekniikkaratkaisut</TableCell>
            <TableCell>Voimassaoloa ei määritelty</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ruotsiksi</TableCell>
            <TableCell>Datatekniklösningar</TableCell>
            <TableCell>Voimassaoloa ei määritelty</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Englanniksi</TableCell>
            <TableCell>IT Solutions</TableCell>
            <TableCell>Voimassaoloa ei määritelty</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const Small = {
  ...Basic,
  args: {
    ...Basic.args,
    size: 'small',
  },
};

export const Caption = {
  ...Basic,
  args: {
    ...Basic.args,
    caption: 'A basic table example with a caption',
  },
};
