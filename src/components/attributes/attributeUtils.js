import { showValidity } from '../../actions/utilAction';
import { isValid } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const isValidOrNull = (date) => date === null || isValid(parseISO(date));

/**
 * Value description for aria-label.
 *
 * It should distinguish this value from other values of the same attribute.
 *
 * @param value attribute value with start and end date
 * @param displayText display-formatted representation of the value
 * @param withValidity if true, validity is included in the description
 */
export const getValueDescription = ({ value, displayText, withValidity }) => {
  let valueDescriptions = [];

  if (displayText) {
    valueDescriptions.push(displayText);
  }

  if (
    withValidity &&
    isValidOrNull(value.startDate) &&
    isValidOrNull(value.endDate)
  ) {
    valueDescriptions.push(showValidity(value.startDate, value.endDate));
  }

  return valueDescriptions.join(', ');
};
