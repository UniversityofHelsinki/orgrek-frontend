import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';

const CodeAttributesEditor = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  return (
    <Stack spacing={2}>
      {Object.entries(values).map(([key, attribute]) => (
        <AttributeEditor
          key={key}
          attributeLabel={t(attribute.key)}
          valueLabel={t('attribute_value')}
          data={[attribute]}
          onChange={(newData) => setValues({ ...values, [key]: newData[0] })}
        />
      ))}
    </Stack>
  );
};

export default CodeAttributesEditor;
