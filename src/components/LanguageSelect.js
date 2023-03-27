import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IfAuthorized from '../auth/IfAuthorized';
import { authActions } from '../auth';

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const handleChange = async (event) => {
    await i18n.changeLanguage(event.target.value);
  };

  return (
    <TextField
      size="small"
      select
      label={t('language')}
      value={i18n.language}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LanguageIcon />
          </InputAdornment>
        ),
      }}
    >
      <MenuItem value={'fi'}>Suomeksi</MenuItem>
      <MenuItem value={'sv'}>På svenska</MenuItem>
      <MenuItem value={'en'}>In English</MenuItem>
      <IfAuthorized action={authActions.texts.edit}>
        <MenuItem value={'ia'}>{t('text_key')}</MenuItem>
      </IfAuthorized>
    </TextField>
  );
};

export default LanguageSelect;
