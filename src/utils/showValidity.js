import i18n from '../i18n';
import { formatDate } from './dateUtils';

const { t } = i18n;

export const showValidity = (startDate, endDate) => {
  const lang = i18n.language;
  if (startDate && endDate) {
    return formatDate(startDate) + ' - ' + formatDate(endDate);
  }
  if (startDate) {
    switch (lang) {
      case 'fi':
        return formatDate(startDate) + ' ' + t('from_date_react');

      default:
        return t('from_date_react') + ' ' + formatDate(startDate);
    }
  }

  if (endDate) {
    switch (lang) {
      case 'fi':
        return formatDate(endDate) + ' ' + t('until_date_react');

      default:
        return t('until_date_react') + ' ' + formatDate(endDate);
    }
  }

  return t('not_specified');
};
