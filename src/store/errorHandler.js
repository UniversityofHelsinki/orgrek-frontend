import i18n from '../i18n';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { showNotification } from './notifications';

const { t } = i18n;

/**
 * Redux middleware for showing error notifications
 */
export const errorHandler =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (!isRejectedWithValue(action)) {
      return next(action);
    }

    console.error('Caught error', action.type, action.payload);

    let message;

    if (action.type === 'api/executeQuery/rejected') {
      message = t('error.fetchFailed');
    } else if (action.type === 'api/executeMutation/rejected') {
      message = t('error.saveFailed');
    } else {
      message = t('error.unexpected');
    }

    dispatch(showNotification({ message, severity: 'error' }));

    return next(action);
  };
