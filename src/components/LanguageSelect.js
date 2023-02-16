import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
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
