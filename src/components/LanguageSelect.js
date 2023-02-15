import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export default function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = React.useState('fi');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="language-change-select-label">
          {t('language')}
        </InputLabel>
        <Select
          labelId="language-change-select-label"
          id="language-select"
          value={language}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'fi'}>{t('finnish')}</MenuItem>
          <MenuItem value={'sv'}>{t('swedish')}</MenuItem>
          <MenuItem value={'en'}>{t('english')}</MenuItem>
          <MenuItem value={'ia'}>{t('text_key')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
