import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import { codeAttributes } from '../../constants/variables';

const attributeEntryComparator = (a, b) => {
  const aIdx = codeAttributes.indexOf(a[0]);
  const bIdx = codeAttributes.indexOf(b[0]);
  return aIdx - bIdx;
};

const CodeAttributesEditor = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  return (
    <Stack spacing={2}>
      {Object.entries(values)
        .sort(attributeEntryComparator)
        .map(([key, attributes], i) => (
          <AttributeEditor
            key={`${key}-${i}`}
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
