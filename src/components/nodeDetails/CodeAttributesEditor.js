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
      {Object.entries(values).map(([key, attributes]) => (
        <AttributeEditor
          key={key}
          attributeLabel={t(key)}
          valueLabel={t('attribute_value')}
          data={attributes}
          onChange={(newData) =>
            setValues({
              ...values,
              [key]: newData,
            })
          }
        />
      ))}
    </Stack>
  );
};

export default CodeAttributesEditor;
