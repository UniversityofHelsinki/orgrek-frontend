import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

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
      defaultValue={i18n.language}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LanguageIcon />
          </InputAdornment>
        ),
      }}
    >
      <MenuItem value={'fi'}>{t('finnish')}</MenuItem>
      <MenuItem value={'sv'}>{t('swedish')}</MenuItem>
      <MenuItem value={'en'}>{t('english')}</MenuItem>
      <MenuItem value={'ia'}>{t('text_key')}</MenuItem>
    </TextField>
  );
};

export default LanguageSelect;
