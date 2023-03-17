import { showValidity } from '../../actions/utilAction';

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

  if (withValidity) {
    valueDescriptions.push(showValidity(value.startDate, value.endDate));
  }

  return valueDescriptions.join(', ');
};
