import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { authActions, isAuthorized } from '../auth';
import useCurrentUser from '../hooks/useCurrentUser';
import { useRef } from 'react';
import { useEffect } from 'react';

export const changeLanguage = async (user, i18n) => {
  if (user && user.preferredLanguage) {
    document.documentElement.lang = user.preferredLanguage;
    await i18n.changeLanguage(user.preferredLanguage);
  } else {
    document.documentElement.lang = 'fi';
    await i18n.changeLanguage('fi');
  }
};

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const user = useCurrentUser();
  const hiddenInputRef = useRef();

  useEffect(() => {
    if (hiddenInputRef.current) {
      const node = hiddenInputRef.current.node;
      if (node) {
        node.setAttribute('aria-labelledBy', 'language_field-label');
      }
    }
  }, [hiddenInputRef.current]);

  const handleChange = async (event) => {
    await i18n.changeLanguage(event.target.value);
    document.documentElement.lang = event.target.value;
  };

  return (
    <TextField
      size="small"
      select
      value={i18n.language}
      label={t('language')}
      onChange={handleChange}
      InputLabelProps={{
        component: 'span',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LanguageIcon />
          </InputAdornment>
        ),
      }}
      id="language_field"
      inputRef={hiddenInputRef}
    >
      <MenuItem aria-label={t('language_select_label_fi')} value={'fi'}>
        {t('language_select_label_fi')}
      </MenuItem>
      <MenuItem aria-label={t('language_select_label_sv')} value={'sv'}>
        {t('language_select_label_sv')}
      </MenuItem>
      <MenuItem aria-label={t('language_select_label_en')} value={'en'}>
        {t('language_select_label_en')}
      </MenuItem>
      {isAuthorized(user, authActions.texts.edit) && (
        <MenuItem aria-label={t('language_select_label_ia')} value={'ia'}>
          {t('language_select_label_ia')}
        </MenuItem>
      )}
    </TextField>
  );
};

export default LanguageSelect;
