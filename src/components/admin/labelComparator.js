import { gridStringOrNumberComparator } from '@mui/x-data-grid';

const getLabel = (options, value) =>
  (options || []).find((option) => option.value === value)?.label || '';

const labelComparator = (options) => (a, b) =>
  gridStringOrNumberComparator(getLabel(options, a), getLabel(options, b));

export default labelComparator;
