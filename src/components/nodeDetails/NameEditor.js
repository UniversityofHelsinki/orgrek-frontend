import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const NameEditor = ({ keys }) => {
  const { t } = useTranslation();

  const fields = [
    { name: 'value', label: t('attribute_value') },
    'startDate',
    'endDate',
  ];

  return (
    <Stack spacing={2}>
      {keys.map((key) => (
        <AttributeEditor
          key={key}
          path={key}
          attributeLabel={t(key)}
          attributeKey={key}
          fields={fields}
        />
      ))}
    </Stack>
  );
};

NameEditor.propTypes = { keys: PropTypes.arrayOf(PropTypes.string).isRequired };

export default NameEditor;
