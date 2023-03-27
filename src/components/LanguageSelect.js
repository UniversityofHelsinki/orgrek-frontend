import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IfAdmin from '../auth/IfAdmin';

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
      <IfAdmin>
        <MenuItem value={'ia'}>{t('text_key')}</MenuItem>
      </IfAdmin>
    </TextField>
  );
};

export default LanguageSelect;
