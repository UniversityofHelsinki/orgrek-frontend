import { formatDateTime } from '../../utils/dateUtils';
import dateColumnType from './dateColumnType';

/**
 * Read-only timestamp column type for MUI X DataGrid.
 *
 * Provides sorting and formatting for ISO 8601 date time strings.
 *
 * @see https://mui.com/x/react-data-grid/column-definition/#custom-column-types
 */
const timestampColumnType = {
  ...dateColumnType,
  editable: false,
  valueFormatter: (params) => {
    if (params.value) {
      return formatDateTime(params.value, undefined, 'Europe/Helsinki');
    } else {
      return '';
    }
  },
};

export default timestampColumnType;
