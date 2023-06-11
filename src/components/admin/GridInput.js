import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

/**
 * InputBase styled to fit into DataGrid edit mode.
 */
const GridInput = styled(InputBase)(() => ({
  fontSize: 'inherit',
  padding: '0 9px',
}));

export default GridInput;
