import AttributeEditor from '../attributes/AttributeEditor';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useForm from '../../hooks/useForm';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const OtherAttributesEditor = () => {
  const { t } = useTranslation();
  const { values, setValues } = useForm();

  const renderValueField = (attributes) => (valueFieldProps) => {
    return attributes.map((option) =>
      option.type === 'options' ? (
        <TextField select {...valueFieldProps}>
          {option.optionValues.map((option) => (
            <MenuItem key={option} value={option}>
              {t(option)}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField {...valueFieldProps} value={option.value} />
      )
    );
  };

  return (
    <Stack spacing={2}>
      {[
        ...Object.entries(values).map(([key, attributes], i) => (
          <AttributeEditor
            key={`${key}-${i}`}
            attributeLabel={t(key)}
            attributeKey={`${key}`}
            valueLabel={t('attribute_value')}
            path={key}
            data={attributes}
            renderValueField={renderValueField(attributes)}
            onChange={(newData) =>
              setValues({
                ...values,
                [key]: newData,
              })
            }
          />
        )),
      ]}
    </Stack>
  );
};

export default OtherAttributesEditor;
